const jwt= require('jsonwebtoken');
const {User} = require('../models/user.model');
const {appConfig} = require('../../config/config');

//Token verification midlleware
const auth = async (req,res,next)=>{
    try{
        const token = req.header('authorization').replace(/^Bearer\s/,'');
        const decoded = jwt.verify(token,appConfig.jwt.secret);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});

        if(!user){
            throw new Error();
        }

        //Store the found user intor req object for future usage!
        req.user = user;
        next();

    }catch(error){
        res.status(401).json({message:'Unauthorized Request',error:error})
    }
};

module.exports = auth;