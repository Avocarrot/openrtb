var RtbObject = require('../rtbObject');
    
var Device = function(connectiontype, carrier, ip, geo, language, make, model, devicetype, dnt, os, osv, didsha1, ua){
  this.connectiontype = connectiontype;
  this.carrier = carrier;  
  this.ip = ip;
  this.geo = geo;
  this.language = language;
  this.make = make;
  this.model = model;
  this.devicetype = devicetype;
  this.dnt = dnt;
  this.os = os;
  this.osv = osv;
  this.didsha1 = didsha1;
  this.ua = ua;
};

Device.prototype = Object.create(RtbObject.prototype);

var DeviceBuilder = function(){};

DeviceBuilder.prototype.connectiontype = function(connectiontype){
  this._connectiontype = connectiontype;
  return this;
};

DeviceBuilder.prototype.carrier = function(carrier){
  this._carrier = carrier;
  return this;
};

DeviceBuilder.prototype.ip = function(ip){
  this._ip = ip;
  return this;
};

DeviceBuilder.prototype.geo = function(geo){
  this._geo = geo;
  return this;
};

DeviceBuilder.prototype.language = function(language){
  this._language = language;
  return this;
};

DeviceBuilder.prototype.make = function(make){
  this._make = make;
  return this;
};

DeviceBuilder.prototype.model = function(model){
  this._model = model;
  return this;
};

DeviceBuilder.prototype.devicetype = function(devicetype){
  this._devicetype = devicetype;
  return this;
};

DeviceBuilder.prototype.dnt = function(dnt){
  this._dnt = dnt;
  return this;
};

DeviceBuilder.prototype.os = function(os){
  this._os = os;
  return this;
};

DeviceBuilder.prototype.osv = function(osv){
  this._osv = osv;
  return this;
};

DeviceBuilder.prototype.didsha1 = function(didsha1){
  this._didsha1 = didsha1;
  return this;
};

DeviceBuilder.prototype.ua = function(ua){
  this._ua = ua;
  return this;
};

DeviceBuilder.prototype.build = function() {
  return new Device(
    this._connectiontype,
    this._carrier,
    this._ip,
    this._geo,
    this._language,
    this._make,
    this._model,
    this._devicetype,
    this._dnt,
    this._os,
    this._osv,
    this._didsha1,
    this._ua
  );
};

module.exports = {
  object: Device,
  builder: DeviceBuilder  
};