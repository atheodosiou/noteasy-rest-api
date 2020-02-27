const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {appConfig} = require('../../config/config');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            console.log('I should add email validation here!!!',value)
        }
    },
    password: {type:String,required:true},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
}, {
    timestamps: true
});

//Define a method on an instance of User model
UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},appConfig.jwt.secret,{expiresIn:'1h'});
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

//Define a new method into user's model
UserSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login !user');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login !isMatch')
    }

    return user;
};

//Hashing user pasword before save
UserSchema.pre('save',async function(next){
    const user =this;
    //It is true at first create 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,appConfig.bcrypt.salt);
    }
    next();
});

const User =  mongoose.model('User', UserSchema);

module.exports={
    User,
    UserSchema
}