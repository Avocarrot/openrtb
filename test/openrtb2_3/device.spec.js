var Device = require('../../lib/openrtb2_3/device').object;
var DeviceBuilder = require('../../lib/openrtb2_3/device').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Device object should", function() {
	it("be an instance of RtbObject", function() {
	  var device = new Device();
	  device.should.be.an.instanceof(RtbObject);      
	});
});