const User = require('../models/User');
const bcrypt = require('bcrypt');

const saltRound = 10;

const registerUser = (req, res) => {

  bcrypt.hash(req.body.password, saltRound, (error, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
  
    newUser.save(error => {
      if(error){
        console.log(error)
      }
      else{
        res.render('secrets');
      }
    });
  })
}

const loginUser = (req, res ) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, (error, user) => {
    if(error){
      console.log(error);
    }else{
      if(user){
        bcrypt.compare(password, user.password, (error, result) => {
          if(result){
            res.render('secrets')
          }
        })
      }
    }
  })
}

module.exports = {
  registerUser,
  loginUser
}