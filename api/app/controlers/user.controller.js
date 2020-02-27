const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save().then(doc => {
            res.status(201).json(doc);
        });
    } catch (error) {
        next(error);
    }
};

// User login
exports.login = async (req, res, next) => {
    try{
        //Try to find the user by email and verify it's password!
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({token,user});

    }catch(error){
        next(error);
    }
};