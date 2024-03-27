const express = require('express');
const router = express.Router();
const { logIn } = require('../Controller/Auth');

// POST request to handle user login
router.post('/logIn', logIn);

module.exports = router;