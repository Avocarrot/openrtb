var should = require('should');
var validator = require('../lib/validator');
var bidResponseSchema = require('../lib/openrtb2_3/schemas/bidResponse');
var mockResponse = require('./mocks/mockResponse');

describe("The Validator should", function() {

	before(function(){
		this.bidResponse = mockResponse;
	});

	it('return an empty array if the object is valid',function(){
		var result = validator.validate(bidResponseSchema, this.bidResponse);
		result.length.should.be.equal(0);
	});

	it('return an array of errors if the object is invalid', function(){
		var invalidBidResponse = JSON.parse(JSON.stringify(this.bidResponse));
		invalidBidResponse.seatbid[0].bid[0].adomain = 42;	//this is invalid because adomain should be an array of strings
		var result = validator.validate(bidResponseSchema, invalidBidResponse);
		result.length.should.be.equal(1);
		result.should.be.eql([{ 
			keyword: 'type',
			dataPath: '.seatbid[0].bid[0].adomain',
			message: 'should be array' 
		}]);
	});

});