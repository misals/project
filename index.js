const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view_helpers')(app);
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
const { urlencoded } = require('express');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { Store } = require('express-session');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const cors = require('cors');
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');

app.use(cors());

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug : true,
    outputStyle : 'expanded',
    prefix : '/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
// make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

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
    secret : env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error running server : ${err}`);
        return;
    }
    console.log(`Yup! server is running on port : ${port}`);
});