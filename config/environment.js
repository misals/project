
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'surajmisalcodeial',
            pass : 'app password'
        }
    },
    google_client_id : "724411045265-us0s52sd77m5esuafkr0r0v9l7a6dkn9.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production'
}



module.exports = development;