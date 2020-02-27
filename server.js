const http = require('http');
const {Connect} =require('./api/app/functions/db/db');
const app = require('./api/app/app');
const {appConfig} = require('./api/config/config');

require('dotenv').config();

//Create http server
const server = http.createServer(app);

//Server
server.listen(appConfig.port, () => {
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