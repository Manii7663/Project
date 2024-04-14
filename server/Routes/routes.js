const express = require('express');
const router = express.Router();
const { logIn,sendOTP } = require('../Controller/authController');
const {passwordMail,newUser,getUsers,getUser,updateUser,deleteUser} =require('../Controller/userController');
const {resetPassword,forgetPassword}=require('../Controller/passwordController')
const {newBatch} = require('../Controller/batchController')
const {createTrainingProgram,createCOE,getTrainingPrograms,getCOE}=require('../Controller/trainingController')
const {createTrainingSession,getTrainingSession,createMultipleSession} =require('../Controller/sessionController')
const {getEmployeeIds} = require("../Controller/empController")
const {createAssessmentScore,getAssessmentScores} = require('../Controller/assesmentController')

// POST request to handle user login
router.post('/logIn', logIn);
router.post('/send-OTP',sendOTP);

router.post('/send-email',passwordMail);
router.post('/new-user', newUser);
router.get('/get-users', getUsers);
router.get('/get-user/:userId', getUser);
router.put('/update-user', updateUser);
router.delete('/delete-user/:_id', deleteUser);

router.post('/reset-password/:id/:token',resetPassword);
router.post('/forget-password',forgetPassword);

router.post('/new-batch',newBatch);

router.post('/create-training-program',createTrainingProgram)
router.get('/get-training/:coeId?',getTrainingPrograms)
router.post('/create-coe',createCOE)
router.get('/get-coe',getCOE)

router.post('/create-training-session',createTrainingSession)
router.post('/add-score',createAssessmentScore)
router.get('/get-training-sessions',getTrainingSession)
router.post('/create-multiple-session',createMultipleSession)

router.get('/get-emp-ids',getEmployeeIds)

router.post('/create-ass-score',createAssessmentScore);
router.get('/get-ass-scores',getAssessmentScores);

module.exports = router;