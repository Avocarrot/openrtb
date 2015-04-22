var Impression = function(id, bidfloor, tagid){
  this.id = id;
  this.bidfloor = bidfloor;
  this.tagid = tagid;
};

var ImpressionBuilder = function(){};

ImpressionBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

ImpressionBuilder.prototype.bidfloor = function(bidfloor){
  this._bidfloor = bidfloor;
  return this;
};

ImpressionBuilder.prototype.tagid = function(tagid){
  this._tagid = tagid;
  return this;
};

ImpressionBuilder.prototype.build = function() {
  return new Impression(this._id, this._bidfloor, this._tagid);
};

module.exports = ImpressionBuilder;