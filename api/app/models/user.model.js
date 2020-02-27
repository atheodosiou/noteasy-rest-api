const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {appConfig} = require('../../config/config');

const UserSchema = mongoose.Schema({
    email: {type:String,required:true},
    password: {type:String,required:true}
}, {
    timestamps: true
});

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