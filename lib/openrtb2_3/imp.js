var Imp = function(id, bidfloor, tagid){
  this.id = id;
  this.bidfloor = bidfloor;
  this.tagid = tagid;
};

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

ImpBuilder.prototype.build = function() {
  return new Imp(this._id, this._bidfloor, this._tagid);
};

module.exports = ImpBuilder;