const { use } = require('passport');
const passport = require('passport');
const User = require('../models/User');

const isauthUser = (req,res) => {
  User.find({'secret': {$ne: null}}, (error, users) => {
    if(error){
      console.log(error)
    }else{
      if(users){
        res.render('secrets', {usersWithSecrets: users})
      }
    }
  })
}

const isauthUserSubmit = (req,res) => {
  if(req.isAuthenticated()){
    res.render('submit');
  }else{
    res.redirect('/login');
  }
}

const submitSecret = (req, res) => {
  const submittedSecret = req.body.secret;
  User.findById(req.user.id, (error, user) => {
    if(error){
      console.log(error);
    }else{
      if(user){
        user.secret = submittedSecret;
        user.save(() => res.redirect('/secrets'));
      }
    }
  })
}

const registerUser = (req, res) => {
  User.register({username: req.body.username}, req.body.password, (error, user) => {
    if (error) {
      console.log(error);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => res.redirect("/secrets"));
    }
  });
}

const loginUser = (req, res ) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  //this method comes from passport
  req.login(user, error => {
    if(error){
      console.log(error);
    }else{
      passport.authenticate('local')(req, res, () => res.redirect('/secrets'));
    }
  })
}

const logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
}

const googleAuthIn = (req, res) => {
    // Successful authentication, redirect to secrets.
    res.redirect('/secrets');
}

module.exports = {
  registerUser,
  loginUser,
  isauthUser,
  logoutUser,
  googleAuthIn,
  isauthUserSubmit,
  submitSecret
}