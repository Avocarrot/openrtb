var util = require('util');
var Bid = require('../../lib/openrtb2_3/bid').object;
var BidBuilder = require('../../lib/openrtb2_3/bid').builder;
var RtbObject = require('../../lib/rtbObject');

describe("The Bid object should", function() {
	var bidBuilder;
	beforeEach(function(){
		bidBuilder = new BidBuilder();
		//Add basic bid info
		bidBuilder
		.status(1)
		.id('1234')
		.price(1.15)
		.impid('6789');
	});

	it("be an instance of RtbObject", function() {
		var bid = new Bid();
		bid.should.be.an.instanceof(RtbObject);
	});

	it("replace macros in a given string", function() {
		var clearPrice = 0.9;
		var bidResponseId = '1234';
		var bid = bidBuilder
			.clearPrice(clearPrice)
			.build();

		var imptracker = "http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&bidResId=${AUCTION_ID}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img";
		bid.replaceMacros(imptracker, {
			'${AUCTION_ID}': bidResponseId
		}).should.equal(util.format("http://trackimp.com/Pixel/Impression/?bidPrice=%s&bidResId=%s&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img", clearPrice, bidResponseId));
		
	});

	it("throw an error if we try to replace macros without a clearPrice", function() {
		var bid = bidBuilder.build();

		(function(){
			bid.replaceMacros('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}');
		}).should.throw('Cannot replace macros without a clear price');
	});

	it("throw an error if we try to replace macros without passing a string", function() {
		var bid = bidBuilder.build();
		var bidResponseId = '1234';

		(function(){
			bid.replaceMacros({
				'${AUCTION_ID}': bidResponseId
			});
		}).should.throw('Invalid string argument');
	});

	it("throw an error if we try to replace macros on empty string", function() {
		var bid = bidBuilder.build();
		var bidResponseId = '1234';

		(function(){
			bid.replaceMacros('', {
				'${AUCTION_ID}': bidResponseId
			});
		}).should.throw('Invalid string argument');
	});

});






