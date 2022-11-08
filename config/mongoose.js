const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/codeial_developement?');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Database"));

db.once('open', function() {
    console.log('Successfilly connected to Database');
});

module.exports = db;