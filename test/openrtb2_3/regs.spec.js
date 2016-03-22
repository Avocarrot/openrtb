var Regs = require('../../lib/openrtb2_3/regs').object;
var RegsBuilder = require('../../lib/openrtb2_3/regs').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Regs object should", function() {
	it("be an instance of RtbObject", function() {
	  var regs = new Regs();
	  regs.should.be.an.instanceof(RtbObject);      
	});
});
