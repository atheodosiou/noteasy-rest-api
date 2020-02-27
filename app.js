const express = require('express');
const {appConfig}=require('./api/config/config');
const morgan = require('morgan');

//Importing routes
const noteRoutes= require('./api/app/routes/note.routes');
const userRoutes= require('./api/app/routes/user.routes');

// create express app
const app = express();
//Logger
app.use(morgan('dev'));

app.use(express.json())

//Handling routes
app.use(appConfig.entryPoint,userRoutes);
app.use(appConfig.entryPoint,noteRoutes);

module.exports=app;