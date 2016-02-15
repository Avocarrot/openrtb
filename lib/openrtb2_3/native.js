var RtbObject = require('../rtbObject');
var removeEmptyValues = require('../utils').removeEmptyValues;

var Native = function(request, ver, api, battr, ext){
  this.request = request;
  this.ver = ver;
  this.api = api;
  this.battr = battr;
  this.ext = ext;
};

Native.prototype = Object.create(RtbObject.prototype);

var NativeBuilder = function(){};

NativeBuilder.prototype.request = function(request){
  this._request = request;
  return this;
};

NativeBuilder.prototype.ver = function(ver){
  this._ver = ver;
  return this;
};

NativeBuilder.prototype.api = function(api){
  this._api = api;
  return this;
};

NativeBuilder.prototype.battr = function(battr){
  this._battr = battr;
  return this;
};

NativeBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

NativeBuilder.prototype.build = function() {
  if (!this._request){
    throw new Error('Native should have request');
  } else {
    var native = new Native(this._request, this._ver, this._api, this._battr, this._ext);
    return removeEmptyValues(native);    
  }
};

module.exports = {
  object: Native,
  builder: NativeBuilder  
};