var Promise = require('bluebird'),
    AppBuilder = require('./app').builder,
    UserBuilder = require('./user').builder,
    DeviceBuilder = require('./device').builder,
    ImpressionBuilder = require('./imp').builder;

var BidRequest = function(timestamp, id, auctionType, imp, app, device, user, ext){
  this.timestamp = timestamp;
  this.id = id;
  this.auctionType = auctionType;
  this.imp = imp;
  this.app = app;
  this.device = device;
  this.user = user;
  this.ext = ext;
};

var BidRequestBuilder = function(){};

BidRequestBuilder.prototype.timestamp = function(timestamp){
  this._timestamp = timestamp;
  return this;
};

BidRequestBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidRequestBuilder.prototype.auctionType = function(auctionType){
  this._auctionType = auctionType;
  return this;
};

BidRequestBuilder.prototype.imp = function(imp){
  this._imp = imp.map(function(imp){
    var builder = new ImpressionBuilder();
    return builder
      .id(imp.id)
      .bidfloor(imp.bidfloor)
      .tagid(imp.tagid)
      .native(imp.native)
      .build();
  });
  return this;
};

BidRequestBuilder.prototype.app = function(app){
  var builder = new AppBuilder();
  this._app = builder
              .storeurl(app.storeurl)
              .cat(app.cat)
              .id(app.id)
              .name(app.name)
              .publisher(app.publisher)
              .build();
  return this;
};

BidRequestBuilder.prototype.device = function(device){
  var builder = new DeviceBuilder();
  this._device = builder
              .connectiontype(device.connectiontype)
              .carrier(device.carrier)
              .ip(device.ip)
              .geo(device.geo)
              .language(device.language)
              .make(device.make)
              .model(device.model)
              .type(1) //Mobile/tablet
              .dnt(device.dnt)
              .os(device.os)
              .osv(device.osv)
              .didsha1(device.didsha1)
              .build();
  return this;
};

BidRequestBuilder.prototype.user = function(user){
  var builder = new UserBuilder();
  this._user = builder
              .gender(user.gender)
              .id(user.id)
              .yob(user.yob)
              .build();
  return this;
};

BidRequestBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

BidRequestBuilder.prototype.build = function() {
  return new Promise(function (resolve, reject) {
    if (!this._timestamp) {
      reject(new Error('BidRequest should have a timestamp'));
    } else if (!this._id){
      reject(new Error('BidRequest should have an id'));
    } else {
      resolve(new BidRequest(
        this._timestamp,
        this._id,
        this._auctionType,
        this._imp,
        this._app,
        this._device,
        this._user,
        this._ext
      ));
    }
  }.bind(this));
};

module.exports = {
  object: BidRequest,
  builder: BidRequestBuilder  
};