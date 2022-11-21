const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path= require('path');
const env = require('./environment');
const { realpath } = require('fs');

let transporter = nodemailer.createTransport(env.smtp);

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