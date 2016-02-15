var RtbObject = require('../rtbObject');

var Banner = function(w, h, wmax, hmax, wmin, hmin, id, btype, battr, pos, mimes, topframe, expdir, api, ext){
  this.w = w;
  this.h = h;
  this.wmax = wmax;
  this.hmax = hmax;
  this.wmin = wmin;
  this.hmin = hmin;
  this.id = id;
  this.btype = btype;
  this.battr = battr;
  this.pos = pos;
  this.mimes = mimes;
  this.topframe = topframe;
  this.expdir = expdir;
  this.api = api;
  this.ext = ext;
};

Banner.prototype = Object.create(RtbObject.prototype);

var BannerBuilder = function(){};

BannerBuilder.prototype.w = function(w){
  this._w = w;
  return this;
};

BannerBuilder.prototype.h = function(h){
  this._h = h;
  return this;
};

BannerBuilder.prototype.wmax = function(wmax){
  this._wmax = wmax;
  return this;
};

BannerBuilder.prototype.hmax = function(hmax){
  this._hmax = hmax;
  return this;
};

BannerBuilder.prototype.wmin = function(wmin){
  this._wmin = wmin;
  return this;
};

BannerBuilder.prototype.hmin = function(hmin){
  this._hmin = hmin;
  return this;
};

BannerBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BannerBuilder.prototype.btype = function(btype){
  this._btype = btype;
  return this;
};

BannerBuilder.prototype.battr = function(battr){
  this._battr = battr;
  return this;
};

BannerBuilder.prototype.pos = function(pos){
  this._pos = pos;
  return this;
};

BannerBuilder.prototype.mimes = function(mimes){
  this._mimes = mimes;
  return this;
};

BannerBuilder.prototype.topframe = function(topframe){
  this._topframe = topframe;
  return this;
};

BannerBuilder.prototype.expdir = function(expdir){
  this._expdir = expdir;
  return this;
};

BannerBuilder.prototype.api = function(api){
  this._api = api;
  return this;
};

BannerBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

BannerBuilder.prototype.build = function() {
  return new Banner(
    this._w,
    this._h,
    this._wmax, 
    this._hmax, 
    this._wmin, 
    this._hmin,
    this._id, 
    this._btype, 
    this._battr, 
    this._pos, 
    this._mimes, 
    this._topframe, 
    this._expdir, 
    this._api, 
    this._ext
  ).removeEmptyValues();
};

module.exports = {
  object: Banner,
  builder: BannerBuilder  
};