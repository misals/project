const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // comment belong to user
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }, 
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
}, {
    timestamps : true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;