var Site = require('../../lib/openrtb2_3/site').object;
var SiteBuilder = require('../../lib/openrtb2_3/site').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Site object should", function() {
	it("be an instance of RtbObject", function() {
	  var site = new Site();
	  site.should.be.an.instanceof(RtbObject);      
	});
});
