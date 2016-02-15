var App = require('../../lib/openrtb2_3/app').object;
var AppBuilder = require('../../lib/openrtb2_3/app').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The App object should", function() {
	it("be an instance of RtbObject", function() {
	  var app = new App();
	  app.should.be.an.instanceof(RtbObject);      
	});
});