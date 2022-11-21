const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new starategy for google login

passport.use(new googleStrategy({
        clientID : "724411045265-us0s52sd77m5esuafkr0r0v9l7a6dkn9.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({ email : profile.emails[0].value }).exec(function(err, user) {
            if(err) {
                console.log('Error in google startegy passport', err);
                return;
            }

            console.log(profile);

            if(user) {
                // if found set this user as req.user
                return done(null, user);
            }
            else {
                // if not found, create the user ans set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if(err) {
                        console.log('Error in creating user google strategy passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;