var Native = require('../../lib/openrtb2_3/native').object;
var NativeBuilder = require('../../lib/openrtb2_3/native').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Native object should", function() {
	it("be an instance of RtbObject", function() {
		var native = new Native();
		native.should.be.an.instanceof(RtbObject);      
	});
});