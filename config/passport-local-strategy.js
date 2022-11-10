const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email' 
    },
    function(email, password, done) {
        // find a user and establish the identity
        User.findOne({email : email}, function(err, user) {
            if(err) {
                console.log('Error in finding the user --> passport');
                return done(err);
            }

            // if user not found or password not matches
            if(!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            // if user is found
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log('Error in finding the user --> passport');
            return done(err);
        }

        return done(null, user);
    });
}); 

// check if the user is authenticated

passport.checkAuthentication = function(req, res, next) {
    // if user is signed in then pass the request to next function
    if(req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        // req.user contains the current signed in user from the sesion cookie and we are just sending it to the locals for the view
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;