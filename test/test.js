var listener = require("../code/mailservice/maillistener");
var parser = require("../code/mailservice/mailparser");
var notifications = require("../code/mailservice/notifications");
var expect = require("chai").expect;
var rewire = require('rewire');
var app = rewire('../code/mailservice/mailparser');

logError = app.__get__('mailparser'); 

describe('Application module', function() {

  it('should output the correct error', function(done) {
      logError().should.equal('MongoDB Connection Error. Please make sure that MongoDB is running.');
      done();
  });
});


describe("listener",function(){
	describe("startMailListener()",function(){
		it("should start the email listener",function(){
			var result = listener.startMailListener();
		});
	})
});