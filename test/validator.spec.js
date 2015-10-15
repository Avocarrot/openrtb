var should = require('should');
var Validator = require('../lib/Validator');
var bidResponseSchema = require('../lib/openrtb2_3/schemas/bidResponseSchema');
var mockResponse = require('./mocks/mockResponse');

describe("The Validator should", function() {

	before(function(){
		this.validator = new Validator();
		this.bidResponse = mockResponse
		this.bidResponse.seatbid[0].bid[0].adm = JSON.parse(this.bidResponse.seatbid[0].bid[0].adm); 
	});

	it('return an empty array if the object is valid',function(){
		
		var result = this.validator.validate(bidResponseSchema, this.bidResponse);
		result.length.should.be.equal(0);
	});

	it('return an array of errors if the object is invalid', function(){
		var invalidBidResponse = JSON.parse(JSON.stringify(this.bidResponse));
		invalidBidResponse.seatbid[0].bid[0].adomain = 42;
		var result = this.validator.validate(bidResponseSchema, invalidBidResponse);
		result.length.should.be.equal(1);
		result.should.be.eql([{ 
			keyword: 'type',
			dataPath: '.seatbid[0].bid[0].adomain',
			message: 'should be array' 
		}]);
	});

});