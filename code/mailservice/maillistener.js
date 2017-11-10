var MailListener = require("mail-listener2")
var iohelper = require('../utils/iohelper')
var path = require('path');
var config = require('../../config/app-config');
var mailParser = require(__dirname + '/mailparser');
var attachmentsFolder = "/attachments/";
var _ = require('lodash');
var attachments = [];
var log4js = require('log4js');
var logger = log4js.getLogger();

/*
Exported function that starts the Mail Listener component
*/  
module.exports = {
	startMailListener: function () {
		
	var privateKey = iohelper.getPrivateKey(path.resolve('config/newfile.key.pem'),'utf8');
	var xoauth2gen = iohelper.getXoAuthGen(config.mail.username,config.mail.serviceAccount,config.mail.scope,privateKey);
	
	xoauth2gen.getToken(function(err, token){
		
		if(err){
			return console.log(err);
		}		
		var mailListener = getMailListener(token);		
		mailListener.start();
		
		mailListener.on("mail", function(mail, seqno, attributes){
			processMail(mail);
		});		
		
		mailListener.on("attachment", function(attachment){
			processAttachment(attachment);
		});
		
		mailListener.on("server:connected", function(){
			console.log("imapConnected");
			logger.info('imap-Connected-Log4JS');
		});
		
		mailListener.on("server:disconnected", function(){
			console.log("imapDisconnected");
			mailListener.start(); 
		});
		
		mailListener.on("error", function(err){
			console.log(err);
		});
	});
	
	} 
};

/*
Private function that processess the email received
*/
function processMail(mail){
	process.nextTick(function() {
		mailParser.parseEmail(mail,attachments,function(){
		attachments = [];
		});
	});
}

/*
Private function that processes the attachment in email
*/
function processAttachment(attachment){
	try{
		if(attachment['contentType'] == config.excel.XLSCT || attachment['contentType'] == config.excel.XLSXCT) {
			var rnd = _.random(1000,8000);
			attachment.stream.pipe(iohelper.getFileStream(__dirname + attachmentsFolder + rnd + attachment.generatedFileName));
			attachments.push(rnd + attachment.generatedFileName);		
		}	
	}
	catch(err){
		console.log(err);
	}	
}

/*
Private function that returns a MailListener object
*/
function getMailListener(token){
	var mailListener = new MailListener({
		  xoauth2 : token,
		  host: config.mail.host, //imap host
		  port: config.mail.port, // imap port 
		  tls: true,
		  connTimeout: 10000, // Default by node-imap 
		  authTimeout: 5000, // Default by node-imap, 
		  debug: console.log, // Or your custom function with only one incoming argument. Default: null 
		  tlsOptions: { rejectUnauthorized: false },
		  mailbox: config.mail.mailbox, // mailbox to monitor 
		  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved 
		  markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
		  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
		  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib. 
		  attachments: false, // download attachments as they are encountered to the project directory 
		  attachmentOptions: { directory: "" } // specify a download directory for attachments 
		});
		
		return mailListener;	
}
