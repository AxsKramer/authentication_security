const express= require('express');
const router = express.Router();
const {homePage, loginPage, registerPage,} = require('../controller/pagesController');
const {registerUser, loginUser} = require('../controller/userController');

router.get('/', homePage);
router.get('/login', loginPage);
router.get('/register', registerPage);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.delete('/');

module.exports = router;