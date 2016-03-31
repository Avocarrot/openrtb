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
		bid.replaceMacros({
			'${AUCTION_ID}': bidResponseId
		}, imptracker).should.equal(util.format("http://trackimp.com/Pixel/Impression/?bidPrice=%s&bidResId=%s&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img", clearPrice, bidResponseId));
		
	});

	it("throw an error if we try to replace macros without a clearPrice", function() {
		var bid = bidBuilder
			.nurl('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}')
			.adm('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}')
			.build();

		(function(){
			bid.replaceMacros();
		}).should.throw('Cannot replace macros without a clear price');
	});

});