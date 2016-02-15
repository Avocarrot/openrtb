var Banner = require('../../lib/openrtb2_3/banner').object;
var BannerBuilder = require('../../lib/openrtb2_3/banner').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Banner object should", function() {
	it("be an instance of RtbObject", function() {
		var banner = new Banner();
		banner.should.be.an.instanceof(RtbObject);      
	});
});