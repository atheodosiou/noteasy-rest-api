const express = require('express');
const { appConfig } = require('../config/config');
const morgan = require('morgan');
const { handleCORS } = require('./functions/utils/cors');
const auth = require('./midllewares/auth');

//Importing routes
const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');

// create express app
const app = express();
//Logger
app.use(morgan('dev'));
app.use(express.json())

//Handling CORS errors
app.use(handleCORS);

//Handling routes
app.use(appConfig.entryPoint, userRoutes);
app.use(appConfig.entryPoint, auth, noteRoutes);

//Handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    })
});

module.exports = app;