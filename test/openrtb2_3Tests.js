var moment = require('moment'),
    should = require('should'),
    tk = require('timekeeper'),
    BidRequestBuilder = require('../lib/openrtb2_3/bidRequest'),
    BidResponseBuilder = require('../lib/openrtb2_3/bidResponse');

describe("OpenRTB 2.3 unit test suite", function() {

  before(function(){
    var time = moment.utc('2015-01-14T00:00:00').format(); //Janurary 14 2015,
    //Freeze time
    tk.freeze(time);
  });

  after(function(){
    tk.reset(); // Reset
  });

  describe("The BidRequestBuilder should", function() {

    it("build a valid bid request object", function(done) {
      var builder = new BidRequestBuilder();
      builder
      .timestamp(moment.utc().format())
      .requestId('1234')
      .auctionType(2)
      .impressions([
          {
              "id":"1",
              "native":{
                  "request": "{\"ver\":1,\"layout\":6,\"assets\":[{\"id\":0,\"req\":1,\"title\":{\"len\":25}},{\"id\":1,\"req\":1,\"img\":{\"type\":3,\"wmin\":300,\"hmin\":250}},{\"id\":2,\"req\":1,\"img\":{\"type\":1,\"wmin\":50,\"hmin\":50}},{\"id\":3,\"req\":1,\"data\":{\"type\":2,\"len\":90}},{\"id\":4,\"req\":0,\"data\":{\"type\":3}},{\"id\":5,\"req\":0,\"data\":{\"type\":12,\"len\":15}}]}"
              },
              "tagid": "eb09ff2a287598302fd631493949169b0d17f815",
              "bidfloor": 1.3
          }
      ])
      .app({
          "id":"55",
          "name":"Test App",
          "cat":["IAB3-1"],
          "storeurl": "http://www.example.com",
          "publisher":{  
              "id": "6332"
          }
      })
      .device({
        "dnt":0,
        "ua":"Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        "ip":"76.174.49.222",
        "connectiontype":2,
        "devicetype":1,
        "didsha1": "bbc9ff2a287598302fd631693949169b0d17f215",
        "carrier": "o2",
        "make": "samsung GT-I9300",
        "model": "Android",
        "language": "en",
        "os": "Android",
        "osv": "5.1.1",
        "geo": {
            "country": "UK"
        }
      })
      .user({
          "id":"55816b39711f9b5acf3b90e313ed29e51665623f"
      })
      .ext({
        'extra': '1234'
      })
      .build()
      .then(function(bidRequest){
        bidRequest.should.have.property('timestamp', "2015-01-14T00:00:00+00:00");
        bidRequest.should.have.property('requestId', "1234");
        bidRequest.should.have.property('auctionType', 2);

        //Check imp object
        bidRequest.impressions.length.should.equal(1);
        bidRequest.impressions[0].should.have.properties({
          id: '1',
          bidfloor: 1.3,
          tagid: 'eb09ff2a287598302fd631493949169b0d17f815' 
        });

        //Check app object
        bidRequest.app.should.have.properties({
          cat: [ 'IAB3-1' ],
          id: '55',
          name: 'Test App',
          publisher: { 
            id: '6332' 
          },
          storeurl: 'http://www.example.com'
        });

        //Check device object
        bidRequest.device.should.have.properties({
          carrier: 'o2',
          connectiontype: 2,
          didsha1: 'bbc9ff2a287598302fd631693949169b0d17f215',
          dnt: 0,
          ip: '76.174.49.222',
          geo: {
            country: "UK"
          },
          language: 'en',
          make: 'samsung GT-I9300',
          model: 'Android',
          os: 'Android',
          osv: '5.1.1',
          type: 1
        });

        //Check user object
        bidRequest.user.should.have.properties({
          id: '55816b39711f9b5acf3b90e313ed29e51665623f'
        });

        //Check ext object
        bidRequest.ext.should.have.properties({
          'extra': '1234'
        });

        done();
      });
    });

    it("throw an error if a timestamp was not provided", function(done) {
      var builder = new BidRequestBuilder();
      builder
      .timestamp()
      .build()
      .catch(function(err){
        err.message.should.equal('BidRequest should have a timestamp');
        done();
      });
    });

    it("throw an error if a requestId was not provided", function(done) {
      var builder = new BidRequestBuilder();
      builder
      .timestamp(moment.utc().format())
      .build()
      .catch(function(err){
        err.message.should.equal('BidRequest should have a requestId');
        done();
      });
    });

  });

  describe("The BidResponseBuilder should", function() {

    it("build a valid bid response record", function(done) {
      var builder = new BidResponseBuilder();
      builder
      .timestamp(moment.utc().format())
      .status(1)
      .bidderName('test-bidder')
      .seatbid([ 
        { 
          bid: [ 
            { 
              adid: 1,
              id: '819582c3-96b2-401a-b60d-7ac3c117a513',
              impid: 'e317ae49-8cd1-47b0-b022-02a8830182ce',
              price: 1.05,
              nurl: 'http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}',
              adm: '{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}',
              cid: '9607',
              crid: '335224',
              adomain: ["example.com"] 
          } 
          ]
        } 
      ])
      .build()
      .then(function(bidResponse){
        bidResponse.should.have.property('timestamp', '2015-01-14T00:00:00+00:00');
        bidResponse.should.have.property('status', 1);
        bidResponse.should.have.property('bidderName', 'test-bidder');

        //Check bids part
        bidResponse.should.have.property('seatbid');
        bidResponse.seatbid.length.should.equal(1);
        var bid = bidResponse.seatbid[0].bid[0];
        // bid.status.should.equal(1);
        bid.crid.should.equal('335224');
        bid.cid.should.equal('9607');
        bid.id.should.equal('819582c3-96b2-401a-b60d-7ac3c117a513');
        bid.impid.should.equal('e317ae49-8cd1-47b0-b022-02a8830182ce');
        bid.price.should.equal(1.05);
        // bid.clearPrice.should.equal(0.5);
        bid.adid.should.equal(1);
        bid.adomain[0].should.equal("example.com");
        done();
      });
    });

    it("throw an error if a timestamp was not provided", function(done) {
      var builder = new BidResponseBuilder();
      builder
      .timestamp()
      .build()
      .catch(function(err){
        err.message.should.equal('BidResponse should have a timestamp');
        done();
      });
    });

    it("throw an error if a bid response-level status was not provided", function(done) {
      var builder = new BidResponseBuilder();
      builder
      .timestamp(moment.utc().format())
      .build()
      .catch(function(err){
        err.message.should.equal('BidResponse should have a status');
        done();
      });
    });

  });

});
