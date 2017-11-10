var fs = require("fs");
var xoauth2 = require('xoauth2');

/*
Helper functions
*/
module.exports = {
	getXoAuthGen: function (user,service,scope,privateKey) {
		xoauth2gen = xoauth2.createXOAuth2Generator({
				user: user,
				service: service,
				scope: scope,
				privateKey: privateKey
		}); 
		return xoauth2gen;
	},
	
	getPrivateKey: function (filePath, encoding) {
		return fs.readFileSync(filePath,encoding);
	},
	
	getFileStream: function(filePath){
		return fs.createWriteStream(filePath);
	}
	
};

