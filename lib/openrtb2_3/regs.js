var RtbObject = require('../rtbObject');
var removeEmptyValues = require('../utils').removeEmptyValues;

var Regs = function(coppa, ext){
  this.coppa = coppa;
  this.ext = ext;
};

Regs.prototype = Object.create(RtbObject.prototype);

var RegsBuilder = function(){};

RegsBuilder.prototype.coppa = function(coppa){
  this._coppa = coppa;
  return this;
};

RegsBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

RegsBuilder.prototype.build = function() {
  var user = new Regs(this._coppa, this._ext);
  return removeEmptyValues(user);
};

module.exports = {
  object: Regs,
  builder: RegsBuilder
};
