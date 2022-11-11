const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
const { urlencoded } = require('express');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { Store } = require('express-session');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'expanded',
    prefix : '/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// SetUp the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    // TODO change the secret key before deployement in production
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl : "mongodb://0.0.0.0:27017/social_media",
         autoremove : "disabled",
     },function(err) {
         console.log("error at mongo store",err || "connection established to store cookie");
     })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error running server : ${err}`);
        return;
    }
    console.log(`Yup! server is running on port : ${port}`);
});