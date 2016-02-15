var User = require('../../lib/openrtb2_3/user').object;
var UserBuilder = require('../../lib/openrtb2_3/user').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The User object should", function() {
	it("be an instance of RtbObject", function() {
	  var user = new User();
	  user.should.be.an.instanceof(RtbObject);      
	});
});