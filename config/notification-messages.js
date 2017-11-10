var notifications = {};
notifications.mailparser = {};

notifications.mailparser.subNoSheet = "Timesheet - Incorrect Timesheet";
notifications.mailparser.subSuccess = "Timesheet - Saved successfully";
notifications.mailparser.msgNoSheet = "<p>Hi &name&,</p><p>The email you had sent did not have an MS Excel sheet as attachment. Please enter your timesheet in an MS Excel file, attach the file in an email and send it to timesheet@orchidapps.com</p><p>Thank You</p><p>Soliton HR</p>";
notifications.mailparser.msgSuccess = "<p>Hi &name&,</p><p>Thank you for submitting the timesheet. We have received it and saved successfully.</p><p>Thank You</p><p>Soliton HR</p>";

module.exports = notifications;

