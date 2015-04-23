var BuilderFactory = require('../lib/builderFactory'),
    BidRequestBuilder = require('../lib/openrtb2_3/bidRequest').builder,
    BidResponseBuilder = require('../lib/openrtb2_3/bidResponse').builder,
    SeatbidBuilder = require('../lib/openrtb2_3/seatbid').builder,
    AppBuilder = require('../lib/openrtb2_3/app').builder,
    DeviceBuilder = require('../lib/openrtb2_3/device').builder,
    ImpBuilder = require('../lib/openrtb2_3/imp').builder,
    NativeBuilder = require('../lib/openrtb2_3/native').builder,    
    PublisherBuilder = require('../lib/openrtb2_3/publisher').builder,
    UserBuilder = require('../lib/openrtb2_3/user').builder,
    BidBuilder = require('../lib/openrtb2_3/bid').builder;

describe("The BuilderFactory should", function() {
  var builderFactory;
  before(function(){
    builderFactory = new BuilderFactory();
  });

  it("construct and return a bid request builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'bidRequest'
    });
    builder.should.be.an.instanceOf(BidRequestBuilder);
  });

  it("construct and return a bid response builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'bidResponse'
    });
    builder.should.be.an.instanceOf(BidResponseBuilder);
  });

  it("construct and return a seatbid builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'seatbid'
    });
    builder.should.be.an.instanceOf(SeatbidBuilder);
  });

  it("construct and return a bid builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'bid'
    });
    builder.should.be.an.instanceOf(BidBuilder);
  });

  it("construct and return an app builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'app'
    });
    builder.should.be.an.instanceOf(AppBuilder);
  });

  it("construct and return a user builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'user'
    });
    builder.should.be.an.instanceOf(UserBuilder);
  });

  it("construct and return a publisher builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'publisher'
    });
    builder.should.be.an.instanceOf(PublisherBuilder);
  });

  it("construct and return a device builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'device'
    });
    builder.should.be.an.instanceOf(DeviceBuilder);
  });

  it("construct and return an imp builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'imp'
    });
    builder.should.be.an.instanceOf(ImpBuilder);
  });

  it("construct and return a native builder", function() {
    var builder = builderFactory.getBuilder({
      builderType: 'native'
    });
    builder.should.be.an.instanceOf(NativeBuilder);
  });

});
