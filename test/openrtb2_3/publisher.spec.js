var Publisher = require('../../lib/openrtb2_3/publisher').object;
var PublisherBuilder = require('../../lib/openrtb2_3/publisher').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Publisher object should", function() {
	it("be an instance of RtbObject", function() {
		var publisher = new Publisher();
		publisher.should.be.an.instanceof(RtbObject);      
	});
});