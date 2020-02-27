require('dotenv').config();

const appConfig={
    entryPoint:"/api/v1",
    port:5000,
    bcrypt:{
        salt:parseInt(process.env.BCRYPT_SALT)
    },
    jwt:{
        secret:process.env.JWT_SECRET
    }
}

module.exports={
    appConfig
}