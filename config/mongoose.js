const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(
    "mongodb+srv://Suraj-Misal:12345@codeial-blog-project.ozufbbw.mongodb.net/test?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;