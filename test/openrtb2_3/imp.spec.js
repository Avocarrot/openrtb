var Imp = require('../../lib/openrtb2_3/imp').object;
var ImpBuilder = require('../../lib/openrtb2_3/imp').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Imp object should", function() {
	it("be an instance of RtbObject", function() {
	  var imp = new Imp();
	  imp.should.be.an.instanceof(RtbObject);      
	});
});