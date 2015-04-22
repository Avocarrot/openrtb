var Bid = function(status, adid, adomain, id, price, cid, clearPrice, crid, impid){
  this.status = status;
  this.adid = adid;
  this.adomain = adomain;
  this.id = id;
  this.price = price;
  this.cid = cid;
  this.clearPrice = clearPrice;
  this.crid = crid;
  this.impid = impid;
};

var BidBuilder = function(){};

BidBuilder.prototype.status = function(status){
  this._status = status;
  return this;
};

BidBuilder.prototype.adid = function(adid){
  this._adid = adid;
  return this;
};

BidBuilder.prototype.adomain = function(adomain){
  this._adomain = adomain;
  return this;
};

BidBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidBuilder.prototype.price = function(price){
  this._price = price;
  return this;
};

BidBuilder.prototype.cid = function(cid){
  this._cid = cid;
  return this;
};

BidBuilder.prototype.clearPrice = function(clearPrice){
  this._clearPrice = clearPrice;
  return this;
};

BidBuilder.prototype.crid = function(crid){
  this._crid = crid;
  return this;
};

BidBuilder.prototype.impid = function(impid){
  this._impid = impid;
  return this;
};

BidBuilder.prototype.build = function() {
  if (!this._price){
    throw new Error('Bid should have a price');
  } else if (!this._impid){
    throw new Error('Bid should have an impid');
  } else {
    return new Bid(
      this._status,
      this._adid,
      this._adomain,
      this._id,
      this._price,
      this._cid,
      this._clearPrice,
      this._crid,
      this._impid
    );      
  }
};

module.exports = BidBuilder;