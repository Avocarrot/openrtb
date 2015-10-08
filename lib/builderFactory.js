var BidRequestBuilder = require('./openrtb2_3/bidRequest').builder;
var BidResponseBuilder = require('./openrtb2_3/bidResponse').builder;
var SeatbidBuilder = require('./openrtb2_3/seatbid').builder;
var AppBuilder = require('./openrtb2_3/app').builder;
var DeviceBuilder = require('./openrtb2_3/device').builder;
var ImpBuilder = require('./openrtb2_3/imp').builder;
var NativeBuilder = require('./openrtb2_3/native').builder;
var BannerBuilder = require('./openrtb2_3/banner').builder;
var PublisherBuilder = require('./openrtb2_3/publisher').builder;
var UserBuilder = require('./openrtb2_3/user').builder;
var BidBuilder = require('./openrtb2_3/bid').builder;
var Validator = require('./openrtb2_3/Validator');

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
  } else if (options.builderType === 'banner'){
    return new BannerBuilder();
  } else if (options.builderType === 'user'){
    return new UserBuilder();
  } else if (options.builderType === 'publisher'){
    return new PublisherBuilder();
  } else if (options.builderType === 'seatbid'){
    return new SeatbidBuilder();
  } else if (options.builderType === 'bid') {
    return new BidBuilder();
  } else if (options.builderType === 'validate') {
    return new Validator();
  } 
  else {
    throw new Error('Unsupported builder');
  }
};

module.exports = BuilderFactory;