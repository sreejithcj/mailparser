var notifications = require(__dirname + '/notifications');
var msgNotification = require('../../config/notification-messages'); //Config file that has email body, subject etc
var config = require('../../config/app-config'); //Application config file

/*
Exported function 'parseEmail' that triggers parsing of the email received
This function accepts the 'mail' object, checks the file type in the email attachment and
notifies the user via email.
*/
module.exports = {
	parseEmail: function (mail,attachments,callback){
		//Parse Excel sheet here
		notifyUser(mail,attachments,function(response){
			console.log(response);
		});
		callback();
	}
};

/*
Private function that prepares email message and calls sendNotification to send email notification to the user. 
*/
var notifyUser = function(mail,attachments,callback){
	getNotificaitonEmailParams(mail,attachments,function(params){
		notifications.sendNotification(params.mail,params.subject,params.body,function(response){
			callback(response);
		});
	});
	//callback();
}

/*
Private function that prepares the Employee Name, Subject, Message to 
send the email. 
*/
var getNotificaitonEmailParams = function(mail,attachments,callback){

	var subject = null;
	var mailBody = null;
	var name = mail.from[0]['name'];
	var email = mail.from;
	
	if(attachments.length<=0){
		subject = msgNotification.mailparser.subNoSheet;
		getEmailBody (name,msgNotification.mailparser.msgNoSheet,function(body){
			mailBody = body;
		});
	}
	else{
		subject = msgNotification.mailparser.subSuccess;
		getEmailBody (name,msgNotification.mailparser.msgSuccess,function(body){
			mailBody = body;
		});
	}
	callback({mail:email,subject:subject, body:mailBody});	
}

/*
Private utility function to replace placeholder with name in email body
*/
var getEmailBody = function(name,message,callback){
	callback(message.replace('&name&',name));
}