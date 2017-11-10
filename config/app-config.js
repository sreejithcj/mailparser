var config = {};
config.mail = {};
config.excel = {};

config.mail.service = 'gmail';
config.mail.username = 'timesheet@orchidapps.com';
config.mail.password = '';
config.mail.host = 'imap.gmail.com';
config.mail.port = '993';
config.mail.mailbox = 'INBOX';
config.mail.fromNotifications = "Timesheet HR";  
config.mail.serviceAccount = 'mailservice@timesheet-161707.iam.gserviceaccount.com';
config.mail.scope = 'https://mail.google.com/';
config.mail.clientid = '';

config.excel.XLSCT = 'application/vnd.ms-excel';
config.excel.XLSXCT = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

module.exports = config;