var moment = require('moment'),
    should = require('should'),
    tk = require('timekeeper'),
    RtbObject = require('../lib/rtbObject'),
    Bid = require('../lib/openrtb2_3/bid').object,
    BidRequest = require('../lib/openrtb2_3/bidRequest').object,
    BidResponse = require('../lib/openrtb2_3/bidResponse').object,
    Device = require('../lib/openrtb2_3/device').object,
    Imp = require('../lib/openrtb2_3/imp').object,
    Native = require('../lib/openrtb2_3/native').object,
    Publisher = require('../lib/openrtb2_3/publisher').object,
    Seatbid = require('../lib/openrtb2_3/seatbid').object,
    User = require('../lib/openrtb2_3/user').object,
    App = require('../lib/openrtb2_3/app').object,
    BidRequestBuilder = require('../lib/openrtb2_3/bidRequest').builder,
    BidBuilder = require('../lib/openrtb2_3/bid').builder,
    BidResponseBuilder = require('../lib/openrtb2_3/bidResponse').builder;

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
      .id('1234')
      .at(2)
      .imp([
          {
              "id":"1",
              "native":{
                "api": [ 3 ], 
                "battr": [ 13, 14 ],
                "request": {
                  "ver": 1,
                  "layout": 6,
                  "assets": [
                    {
                      "id": 0,
                      "req": 1,
                      "title": {
                        "len": 25
                      }
                    }, 
                    { 
                      "id": 1, 
                      "req": 1, 
                      "img": { 
                        "type": 3, 
                        "wmin": 100, 
                        "hmin": 100
                      } 
                    },
                    {
                      "id": 3, 
                      "req": 0, 
                      "data": { 
                        "type": 2,
                        "len": 90
                      }                       
                    }
                  ]
                }
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
              "id": "6332",
              "name": 'publisher 1'
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
          "id":"55816b39711f9b5acf3b90e313ed29e51665623f",
          "yob": 1987,
          "gender": "M",
      })
      .ext({
        'extra': '1234'
      })
      .build()
      .then(function(bidRequest){
        bidRequest.should.have.property('timestamp', "2015-01-14T00:00:00+00:00");
        bidRequest.should.have.property('id', "1234");
        bidRequest.should.have.property('at', 2);

        //Check imp object
        bidRequest.imp.length.should.equal(1);
        bidRequest.imp[0].should.have.properties({
          id: '1',
          bidfloor: 1.3,
          tagid: 'eb09ff2a287598302fd631493949169b0d17f815'
        });

        //Check imp.native object
        var native = bidRequest.imp[0].native;
        native.should.have.property('api', [3]);
        native.should.have.property('battr', [13,14]);
        native.should.have.property('request', {
          assets: [
            { id: 0, req: 1, title: { len: 25 } },
            { id: 1, img: { hmin: 100, type: 3, wmin: 100 }, req: 1 },
            { data: { len: 90, type: 2 }, id: 3, req: 0 }
          ],
          layout: 6,
          ver: 1
        });

        //Check app object
        bidRequest.app.should.have.properties({
          cat: [ 'IAB3-1' ],
          id: '55',
          name: 'Test App',
          storeurl: 'http://www.example.com'
        });

        //Check app.publisher object
        bidRequest.app.publisher.should.have.properties({ id: '6332', name: 'publisher 1' });

        //Check device object
        bidRequest.device.should.have.properties({
          carrier: 'o2',
          connectiontype: 2,
          didsha1: 'bbc9ff2a287598302fd631693949169b0d17f215',
          ua: 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
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
          id: '55816b39711f9b5acf3b90e313ed29e51665623f',
          gender: 'M',
          yob: 1987
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

    it("throw an error if a id was not provided", function(done) {
      var builder = new BidRequestBuilder();
      builder
      .timestamp(moment.utc().format())
      .build()
      .catch(function(err){
        err.message.should.equal('BidRequest should have an id');
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
              status: 1,
              clearPrice: 0.9,
              adid: 1,
              id: '819582c3-96b2-401a-b60d-7ac3c117a513',
              impid: 'e317ae49-8cd1-47b0-b022-02a8830182ce',
              price: 1.05,
              nurl: 'http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}',
              adm: '{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}',
              cid: '9607',
              crid: '335224',
              iurl: 'http://cdn.testimage.net/1200x627.png',
              adomain: ["example.com"] 
          } 
          ]
        }
      ])
      .then(function(){
        return builder.build();
      })
      .then(function(bidResponse){
        bidResponse.should.have.property('timestamp', '2015-01-14T00:00:00+00:00');
        bidResponse.should.have.property('status', 1);
        bidResponse.should.have.property('bidderName', 'test-bidder');

        //Check bids part
        bidResponse.should.have.property('seatbid');
        bidResponse.seatbid.length.should.equal(1);
        var bid = bidResponse.seatbid[0].bid[0];
        bid.status.should.equal(1);
        bid.nurl.should.equal('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}');
        bid.adm.should.equal('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}');
        bid.crid.should.equal('335224');
        bid.cid.should.equal('9607');
        bid.id.should.equal('819582c3-96b2-401a-b60d-7ac3c117a513');
        bid.impid.should.equal('e317ae49-8cd1-47b0-b022-02a8830182ce');
        bid.price.should.equal(1.05);
        bid.clearPrice.should.equal(0.9);
        bid.adid.should.equal(1);
        bid.adomain[0].should.equal("example.com");
        bid.iurl.should.equal('http://cdn.testimage.net/1200x627.png');
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

    it("replace macros in adm and nurl", function(done) {
      bidBuilder
      .clearPrice(0.9)
      .nurl('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}')
      .adm('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}')
      .build()
      .then(function(bid){
        return bid.replaceMacros();
      }).then(function(bid){
        bid.nurl.should.equal('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=0.9')
        bid.adm.should.equal('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=0.9&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}')
        done();        
      });
    });

    it("throw an error if we try to replace macros without a clearPrice", function(done) {
      bidBuilder
      .nurl('http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}')
      .adm('{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?bidPrice=${AUCTION_PRICE}&data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}')
      .build()
      .then(function(bid){
        return bid.replaceMacros();
      }).catch(function(err){
        err.message.should.equal('Cannot replace macros without a clear price');
        done();        
      });
    });

  });

  describe("The App object should", function() {
    it("be an instance of RtbObject", function() {
      var app = new App();
      app.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The BidRequest object should", function() {
    it("be an instance of RtbObject", function() {
      var bidRequest = new BidRequest();
      bidRequest.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The BidResponse object should", function() {
    it("be an instance of RtbObject", function() {
      var bidResponse = new BidResponse();
      bidResponse.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The Device object should", function() {
    it("be an instance of RtbObject", function() {
      var device = new Device();
      device.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The Imp object should", function() {
    it("be an instance of RtbObject", function() {
      var imp = new Imp();
      imp.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The Native object should", function() {
    it("be an instance of RtbObject", function() {
      var native = new Native();
      native.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The Publisher object should", function() {
    it("be an instance of RtbObject", function() {
      var publisher = new Publisher();
      publisher.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The Seatbid object should", function() {
    it("be an instance of RtbObject", function() {
      var seatbid = new Seatbid();
      seatbid.should.be.an.instanceof(RtbObject);      
    });
  });

  describe("The User object should", function() {
    it("be an instance of RtbObject", function() {
      var user = new User();
      user.should.be.an.instanceof(RtbObject);      
    });
  });

});
