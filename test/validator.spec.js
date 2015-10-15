var should = require('should');
var Validator = require('../lib/Validator');
var bidResponseSchema = require('../lib/openrtb2_3/schemas/bidResponseSchema');

describe("The Validator should", function() {

	before(function(){
		this.validator = new Validator();
		this.bidResponse = {
			"id": "12345",
			"bidid": "56789",
			"seatbid": [
				{
					"bid": [
						{
							"id": "123123214",
							"impid": "31243341",
							"price": 5.80,
							"nurl": "http://example.com/track/win", 
							"adomain": ["ford.com"],
							"iurl": "http://example.com/assets/image.png",
							"cid": "xxsw655xas",
							"cat": ["IAB1-4", "IAB1-5"],
							"adm": "{\"native\":{\"assets\":[{\"id\":0,\"title\":{\"text\":\"This is a sample ad from%s\"}},{\"id\":1,\"img\":{\"url\":\"http://cdn.exampleimage.com/2639042\",\"w\":100,\"h\":100}},{\"id\":2,\"img\":{\"url\":\"http://cdn.exampleimage.com/a/50/50/2639042 \",\"w\":50,\"h\":50}},{\"id\":3,\"data\":{\"value\":\"This is the ad description\"}},{\"id\":4,\"data\":{\"value\":4.5}},{\"id\":5,\"data\":{\"value\":\" Install now\"}}],\"link\":{\"url\":\"http://trackclick.com/Click\"},\"imptrackers\":[\"http://example.com/tracker\"]}}"
						}
					] 
				}
			]
		}
	})

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