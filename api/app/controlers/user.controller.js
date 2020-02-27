const {User} = require('../models/user.model');

// User registration
exports.register = (req, res) => {
  res.status(200).json({message:"register works"});
};

// User login
exports.login = (req, res) => {
    res.status(200).json({message:"login works"});
  };