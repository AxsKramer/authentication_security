const passport = require('passport');
const User = require('../models/User');

const isauthUser = (req,res ) => {
  if(req.isAuthenticated()){
    res.render('secrets');
  }else{
    res.redirect('/login');
  }
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

module.exports = {
  registerUser,
  loginUser,
  isauthUser,
  logoutUser
}