const mongoose =require('mongoose');

function Connect(connectionString) {
    // mongoose.Promise = global.Promise;
    // Connecting to the database
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });
}

module.exports = {
    Connect
}