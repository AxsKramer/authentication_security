require('dotenv').config();
const express = require('express');
const router = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const session = require('express-session');
const passport = require('passport');
const app = express();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


app.use(session({
  secret: "The top secret phrase",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport-local-mongoose adds a helper method 'createStrategy' as statuc 
//method to your schema. The createStrategy is responsible to setup passport-local
//LocalStrategy with the correct options.
passport.use(User.createStrategy());
//serialize and deserialize is only necessary when we're using sessions
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//confid. GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.use('/', router);

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});



app.listen(port, () => console.log('Server running on port: ',port));