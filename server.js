const express = require('express');
const {appConfig}=require('./api/config/config');
const {Connect} =require('./api/app/functions/db/db');
const {errorHandler} = require('./api/app/functions/utils/utils');
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json())

//ADD: CORS handling

// Require Notease routes
const noteasyRoutes = require('./api/app/routes/note.routes')

// define starting point
app.get(appConfig.entryPoint, (req, res) => {
    res.json({"message": "Welcome to Noteasy App. Take notes quickly. Organize and keep track of all your notes."});
});

app.use(appConfig.entryPoint,noteasyRoutes);

app.get('/',(req,res,next)=>{
    res.status(200).json({'error':'error'});
});

//ADD: Error handling

// app.use((error,req,res,next)=>{
//     errorHandler(req,res,next,error);
// });

// listen for requests
app.listen(appConfig.port, () => {
    console.log("Starting server...\n");
    try{
        Connect(process.env.CONNECTION_STRING).then(()=>{
            console.log('Connetion to database was successfull!')
            console.log(`Server is listening on port ${appConfig.port}...`);
        });
    }catch(error){
        console.error('--DB-ERROR--: ',error);
    }
});