const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path= require('path');
const { realpath } = require('fs');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'surajmisalcodeial',
        pass : 'app password'
    }
});

let renderTemplate = (data, realpath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', realpath),
        data,
        function(err, template) {
            if(err) {
                console.log('Error in rendering template', err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}