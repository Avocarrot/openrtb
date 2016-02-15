var moment = require('moment');
var tk = require('timekeeper');
var RtbObject = require('../../lib/rtbObject');
var BidResponse = require('../../lib/openrtb2_3/bidResponse').object;
var BidResponseBuilder = require('../../lib/openrtb2_3/bidResponse').builder;
var mockResponse = require('../mocks/mockResponse');

describe("BidResponse tests", function() {

	before(function(){
		var time = moment.utc('2015-01-14T00:00:00').format(); //Janurary 14 2015,
		//Freeze time
		tk.freeze(time);
	});

	after(function(){
		tk.reset(); // Reset
	});

	describe("The BidResponse object should", function() {
		it("be an instance of RtbObject", function() {
		  var bidResponse = new BidResponse();
		  bidResponse.should.be.an.instanceof(RtbObject);      
		});
	});

	describe("The BidResponseBuilder should", function() {

		it("reject an invalid Bid Response", function(){
		  var builder = new BidResponseBuilder(); 
		  var invalidSeatBid = JSON.parse(JSON.stringify(mockResponse.seatbid));
		  invalidSeatBid[0].bid[0].price = undefined;

		  (function(){
		    builder
		    .timestamp(moment.utc().format())
		    .status(1)
		    .id("1234-5678")
		    .bidderName('test-bidder')      //we dont add a price to the bidResponse so that it fails validation
		    .seatbid(invalidSeatBid)
		    .build();
		  }).should.throw('Validation failed');
		});

		it("build a valid bid response record", function() {
		  var builder = new BidResponseBuilder(); 
		  var bidResponse = builder
		  .timestamp(moment.utc().format())
		  .status(1)
		  .id("1234-5678")
		  .bidderName('test-bidder')
		  .seatbid(mockResponse.seatbid)
		  .build();

		  bidResponse.should.have.property('timestamp', '2015-01-14T00:00:00+00:00');
		  bidResponse.should.have.property('status', 1);
		  bidResponse.should.have.property('id', "1234-5678");
		  bidResponse.should.have.property('bidderName', 'test-bidder');

		  //Check bids part
		  bidResponse.should.have.property('seatbid');
		  bidResponse.seatbid.length.should.equal(1);
		  var bid = bidResponse.seatbid[0].bid[0];
		  bid.nurl.should.equal('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}');
		  bid.adm.should.be.equal('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}');
		  bid.crid.should.equal('335224');
		  bid.cid.should.equal('9607');
		  bid.id.should.equal('819582c3-96b2-401a-b60d-7ac3c117a513');
		  bid.impid.should.equal('e317ae49-8cd1-47b0-b022-02a8830182ce');
		  bid.price.should.equal(1.05);
		  bid.adid.should.equal(1);
		  bid.adomain[0].should.equal("example.com");
		  bid.iurl.should.equal('http://cdn.testimage.net/1200x627.png');
		  bid.ext.should.have.properties({
		    'bidderver': '1'
		  });
		});

	});
});
