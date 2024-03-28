const express = require('express');
const router = express.Router();
const { logIn,newUser } = require('../Controller/Auth');
const {passwordMail,sendOTP} =require('../Controller/appController');

// POST request to handle user login
router.post('/logIn', logIn);

router.post('/newUser', newUser);
router.post('/sendEmail',passwordMail);
router.post('/sendOTP',sendOTP);

module.exports = router;