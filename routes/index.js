const express= require('express');
const router = express.Router();
const passport = require('passport');
const {homePage, loginPage, registerPage,} = require('../controller/pagesController');
const {registerUser, loginUser, isauthUser, logoutUser, googleAuthIn, isauthUserSubmit, submitSecret} = require('../controller/userController');

router.get('/', homePage);
router.get('/login', loginPage);
router.get('/register', registerPage);

router.get('/secrets', isauthUser);
router.get('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthIn
);

router.get('/submit', isauthUserSubmit);
router.post('/submit', submitSecret);

module.exports = router;