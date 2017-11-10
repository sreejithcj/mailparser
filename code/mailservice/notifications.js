var config = require('../../config/app-config');
const nodemailer = require('nodemailer');
var iohelper = require('../utils/iohelper')
var path = require('path');

/*
Exported function to send email notifications
*/
module.exports = {
	sendNotification: function(emailAddress,subject,message,callback) {
		var privateKey = iohelper.getPrivateKey(path.resolve('config/newfile.key.pem'),'utf8');
		var xoauth2gen = iohelper.getXoAuthGen(config.mail.username,config.mail.serviceAccount,config.mail.scope,privateKey);
	
		xoauth2gen.getToken(function(err, token){

		// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				service: config.mail.service,
				auth:{
						type: 'OAuth2',
						user: config.mail.username,
						serviceClient: config.mail.clientid,
						privateKey: privateKey,
						accessToken: token
					}
			});
			
			// setup email data with unicode symbols
			let mailOptions = {
				from: config.mail.fromNotifications + " <" + config.mail.username + ">", //sender address
				to: emailAddress, // list of receivers
				subject: subject, // Subject line
				text: message, // plain text body
				html: message // html body
			};
			
				// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}
				callback(info.response);
				//console.log('Message %s sent: %s', info.messageId, info.response);
			});
		});
	}
};