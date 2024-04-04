const express = require('express');
const router = express.Router();
const { logIn,sendOTP } = require('../Controller/authController');
const {passwordMail,newUser,getUsers} =require('../Controller/userController');
const {resetPassword,forgetPassword}=require('../Controller/passwordController')
const {newBatch} = require('../Controller/batchController')
const {createTrainingProgram,createCOE}=require('../Controller/trainingController')
const {createTrainingSession,createAssessmentScore} =require('../Controller/sessionController')

// POST request to handle user login
router.post('/logIn', logIn);
router.post('/send-OTP',sendOTP);

router.post('/new-user', newUser);
router.post('/send-email',passwordMail);
router.get('/get-users', getUsers);

router.post('/reset-password/:id/:token',resetPassword);
router.post('/forget-password',forgetPassword);
router.post('/new-batch',newBatch);
router.post('/create-training-program',createTrainingProgram)
router.post('/create-coe',createCOE)
router.post('/create-training-session',createTrainingSession)
router.post('/add-score',createAssessmentScore)

module.exports = router;