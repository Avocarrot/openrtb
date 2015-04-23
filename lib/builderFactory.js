var BidRequestBuilder = require('./openrtb2_3/bidRequest'),
    BidResponseBuilder = require('./openrtb2_3/bidResponse'),
    SeatbidBuilder = require('./openrtb2_3/seatbid'),
    AppBuilder = require('./openrtb2_3/app'),
    DeviceBuilder = require('./openrtb2_3/device'),
    ImpBuilder = require('./openrtb2_3/imp'),
    NativeBuilder = require('./openrtb2_3/native'),
    PublisherBuilder = require('./openrtb2_3/publisher'),
    UserBuilder = require('./openrtb2_3/user'),
    BidBuilder = require('./openrtb2_3/bid');

var BuilderFactory = function(){};

BuilderFactory.prototype.getBuilder = function(options){
  options = options || {};
  options.openRtbVersion = options.openRtbVersion || '2.3';

  if (options.builderType === 'bidRequest') {
    return new BidRequestBuilder();
  } else if (options.builderType === 'bidResponse'){
    return new BidResponseBuilder();
  } else if (options.builderType === 'app'){
    return new AppBuilder();
  } else if (options.builderType === 'device'){
    return new DeviceBuilder();
  } else if (options.builderType === 'imp'){
    return new ImpBuilder();
  } else if (options.builderType === 'native'){
    return new NativeBuilder();
  } else if (options.builderType === 'user'){
    return new UserBuilder();
  } else if (options.builderType === 'publisher'){
    return new PublisherBuilder();
  } else if (options.builderType === 'seatbid'){
    return new SeatbidBuilder();
  } else if (options.builderType === 'bid') {
    return new BidBuilder();
  } else {
    throw new Error('Unsupported builder');
  }
};

module.exports = BuilderFactory;