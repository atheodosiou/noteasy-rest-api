const express = require('express');
const {appConfig}=require('./api/config/config');
const morgan = require('morgan');
const {handleCORS} = require('./api/app/functions/utils/cors');

//Importing routes
const noteRoutes= require('./api/app/routes/note.routes');
const userRoutes= require('./api/app/routes/user.routes');

// create express app
const app = express();
//Logger
app.use(morgan('dev'));
app.use(express.json())

//Handling CORS errors
app.use(handleCORS);

//Handling routes
app.use(appConfig.entryPoint,userRoutes);
app.use(appConfig.entryPoint,noteRoutes);

//Handle 404 errors
app.use((req,res,next)=>{
    const error= new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message || 'Internal Server Error'
        }})
});

module.exports=app;