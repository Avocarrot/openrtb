var RtbObject = require('../rtbObject'),
    RtbObject = require('../rtbObject'),
    NativeBuilder = require('./native').builder,
    BannerBuilder = require('./banner').builder;

var Imp = function(id, bidfloor, tagid, native, banner){
  this.id = id;
  this.bidfloor = bidfloor;
  this.tagid = tagid;
  this.native = native;
  this.banner = banner;
};

Imp.prototype = Object.create(RtbObject.prototype);

var ImpBuilder = function(){};

ImpBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

ImpBuilder.prototype.bidfloor = function(bidfloor){
  this._bidfloor = bidfloor;
  return this;
};

ImpBuilder.prototype.tagid = function(tagid){
  this._tagid = tagid;
  return this;
};

ImpBuilder.prototype.native = function(native){
  var builder = new NativeBuilder();
  this._native = builder
                .request(native.request)
                .ver(native.ver)
                .api(native.api)
                .battr(native.battr)
                .ext(native.ext)
                .build();
  return this;
};

ImpBuilder.prototype.banner = function(banner){
  var builder = new BannerBuilder();
  this._banner = builder
                .w(banner.w)
                .h(banner.h)
                .wmax(banner.wmax)
                .hmax(banner.hmax)
                .wmin(banner.wmin)
                .hmin(banner.hmin)
                .id(banner.id)
                .btype(banner.btype)
                .battr(banner.battr)
                .pos(banner.pos)
                .mimes(banner.mimes)
                .topframe(banner.topframe)
                .expdir(banner.expdir)
                .api(banner.api)
                .ext(banner.ext)
                .build();
  return this;
};

ImpBuilder.prototype.build = function() {
  return new Imp(this._id, this._bidfloor, this._tagid, this._native, this._banner);
};

module.exports = {
  object: Imp,
  builder: ImpBuilder  
};