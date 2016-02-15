var Seatbid = require('../../lib/openrtb2_3/seatbid').object;
var SeatbidBuilder = require('../../lib/openrtb2_3/seatbid').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Seatbid object should", function() {
	it("be an instance of RtbObject", function() {
		var seatbid = new Seatbid();
		seatbid.should.be.an.instanceof(RtbObject);      
	});
});