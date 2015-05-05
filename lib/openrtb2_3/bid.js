var Promise = require('bluebird'),
    RtbObject = require('../rtbObject');
    
var Bid = function(status, nurl, adm, adid, adomain, id, price, cid, clearPrice, crid, iurl, impid, parseAdm){
  this.status = status;
  this.nurl = nurl;
  this.adm = adm;
  this.adid = adid;
  this.adomain = adomain;
  this.id = id;
  this.price = price;
  this.cid = cid;
  this.clearPrice = clearPrice;
  this.crid = crid;
  this.iurl = iurl;
  this.impid = impid;
  this.parseAdm = parseAdm;
};

Bid.prototype = Object.create(RtbObject.prototype);

Bid.prototype.replaceMacros = function(){
  return new Promise(function (resolve, reject) {
    if (!this.clearPrice){
      reject(new Error('Cannot replace macros without a clear price'));
    } else {
      this.nurl = this.nurl ? this.nurl.replace('${AUCTION_PRICE}', encodeURIComponent(this.clearPrice)) : this.nurl;
      this.adm = this.adm ? this.adm.replace('${AUCTION_PRICE}', encodeURIComponent(this.clearPrice)) : this.adm;
      resolve(this);
    }
  }.bind(this))
};

var BidBuilder = function(){};

BidBuilder.prototype.status = function(status){
  this._status = status;
  return this;
};

BidBuilder.prototype.nurl = function(nurl){
  this._nurl = nurl;
  return this;
};

BidBuilder.prototype.adm = function(adm){
  this._adm = adm;
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

BidBuilder.prototype.iurl = function(iurl){
  this._iurl = iurl;
  return this;
};

BidBuilder.prototype.impid = function(impid){
  this._impid = impid;
  return this;
};

BidBuilder.prototype.parseAdm = function(parseAdm){
  this._parseAdm = parseAdm;
  return this;
};

BidBuilder.prototype.build = function() {
  return new Promise(function (resolve, reject) {
    if (!this._price){
      reject(Error('Bid should have a price'));
    } else if (!this._impid){
      reject(new Error('Bid should have an impid'));
    } else if (!this._id){
      reject(new Error('Bid should have an id'));
    } else {
      resolve(new Bid(
        this._status,
        this._nurl,
        this._adm,
        this._adid,
        this._adomain,
        this._id,
        this._price,
        this._cid,
        this._clearPrice,
        this._crid,
        this._iurl,
        this._impid,
        this._parseAdm
      ).removeUndefined());
    }
  }.bind(this));
};

module.exports = {
  object: Bid,
  builder: BidBuilder  
};