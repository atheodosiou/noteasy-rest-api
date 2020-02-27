const express = require('express');
const {appConfig}=require('./api/config/config');
const noteasyRoutes= require('./api/app/routes/note.routes');
const morgan = require('morgan');

// create express app
const app = express();
//Logger
app.use(morgan('dev'));

app.use(express.json())


app.use(appConfig.entryPoint,noteasyRoutes);

module.exports=app;