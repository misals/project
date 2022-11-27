const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            // populate: {
            //     path: 'user'
            // },
            // populate: {
            //     path: 'likes'
            // }
            populate : [
                'user', 'likes'
            ]
        }).populate('likes');

    
        let users = await User.find({});

        return res.render('home.ejs', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

        // return res.status(200).json({
        //     posts,users
        // })

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
