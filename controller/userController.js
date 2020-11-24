const User = require('../models/User');

const registerUser = (req, res) => {

  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(error => {
    if(error){
      console.log(error)
    }
    else{
      res.render('secrets');
    }
  });
}

const loginUser = (req, res ) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, (error, user) => {
    if(error){
      console.log(error);
    }else{
      if(user && user.password === password){
        res.render('secrets')
      }
    }
  })
}

module.exports = {
  registerUser,
  loginUser
}