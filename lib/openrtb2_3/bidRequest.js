var RtbObject = require('../rtbObject');
var AppBuilder = require('./app').builder;
var UserBuilder = require('./user').builder;
var DeviceBuilder = require('./device').builder;
var ImpressionBuilder = require('./imp').builder;
var SiteBuilder = require('./site').builder;
var RegsBuilder = require('./regs').builder;
var removeEmptyValues = require('../utils').removeEmptyValues;

var BidRequest = function(timestamp, id, at, imp, app, device, user, bcat, badv, test, tmax, site, regs, ext){
  this.timestamp = timestamp;
  this.id = id;
  this.at = at;
  this.imp = imp;
  this.app = app;
  this.device = device;
  this.user = user;
  this.bcat = bcat;
  this.badv = badv;
  this.test = test;
  this.tmax = tmax;
  this.site = site;
  this.regs = regs;
  this.ext = ext;
};

BidRequest.prototype = Object.create(RtbObject.prototype);

var BidRequestBuilder = function(){};

BidRequestBuilder.prototype.timestamp = function(timestamp){
  this._timestamp = timestamp;
  return this;
};

BidRequestBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidRequestBuilder.prototype.at = function(at){
  this._at = at;
  return this;
};

BidRequestBuilder.prototype.imp = function(imp){
  this._imp = imp.map(function(imp){
    var builder = new ImpressionBuilder();

    builder
    .id(imp.id)
    .bidfloor(imp.bidfloor)
    .tagid(imp.tagid)
    .secure(imp.secure);

    if (imp.banner){
      builder.banner(imp.banner);
    } else if (imp.native){
      builder.native(imp.native);
    }

    return builder.build();
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
              .bundle(app.bundle)
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
              .devicetype(device.devicetype)
              .dnt(device.dnt)
              .os(device.os)
              .osv(device.osv)
              .didsha1(device.didsha1)
              .ua(device.ua)
              .ifa(device.ifa)
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

BidRequestBuilder.prototype.bcat = function(bcat){
  this._bcat = bcat;
  return this;
};

BidRequestBuilder.prototype.badv = function(badv){
  this._badv = badv;
  return this;
};

BidRequestBuilder.prototype.test = function(test){
  this._test = test;
  return this;
};

BidRequestBuilder.prototype.tmax = function(tmax){
  this._tmax = tmax;
  return this;
};

BidRequestBuilder.prototype.site = function(site){
  var builder = new SiteBuilder();
  this._site = builder
            .id(site.id)
            .name(site.name)
            .domain(site.domain)
            .cat(site.cat)
            .sectioncat(site.sectioncat)
            .pagecat(site.pagecat)
            .page(site.page)
            .ref(site.ref)
            .search(site.search)
            .mobile(site.mobile)
            .privacypolicy(site.privacypolicy)
            .publisher(site.publisher)
            .keywords(site.keywords)
            .ext(site.ext)
            .build();
  return this;
};

BidRequestBuilder.prototype.regs = function(regs){
  var builder = new RegsBuilder();
  this._regs = builder
            .coppa(regs.coppa)
            .ext(regs.ext)
            .build();
  return this;
};

BidRequestBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

BidRequestBuilder.prototype.build = function() {
  if (!this._id){
    throw new Error('BidRequest should have an id');
  }

  var bidRequest = new BidRequest(
    this._timestamp || new Date().toISOString(),
    this._id,
    this._at,
    this._imp,
    this._app,
    this._device,
    this._user,
    this._bcat,
    this._badv,
    this._test,
    this._tmax,
    this._site,
    this._regs,
    this._ext
  );

  return removeEmptyValues(bidRequest);
};

module.exports = {
  object: BidRequest,
  builder: BidRequestBuilder
};
