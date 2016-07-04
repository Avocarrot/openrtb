var Content = require('../../lib/openrtb2_3/content').object;
var ContentBuilder = require('../../lib/openrtb2_3/content').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Content object should", function() {
	it("be an instance of RtbObject", function() {
		var content = new Content();
		content.should.be.an.instanceof(RtbObject);      
	});
});
