const express = require('express');
const router = express.Router();

const userController = require('../controlers/user.controller');

// Create a new Note
router.post('/signup', userController.register);
router.post('/signin', userController.login);

module.exports=router;