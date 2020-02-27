const {User} = require('../models/user.model');

// User registration
exports.register = async (req, res, next) => {
    const user = new User(req.body);
    try{
        await user.save().then(doc=>{
            res.status(200).json(doc);
        });
    }catch(error){
        next(error);
    }  
};

// User login
exports.login = (req, res) => {
    res.status(200).json({message:"login works"});
  };