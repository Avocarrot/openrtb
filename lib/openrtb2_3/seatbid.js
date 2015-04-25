var Promise = require('bluebird'),
    RtbObject = require('../rtbObject'),
    util = require('util'),
    Bid = require('./bid').object,
    BidBuilder = require('./bid').builder;

var Seatbid = function(seat, bid, group, ext){
  this.seat = seat;
  this.bid = bid;
  this.group = group;
  this.ext = ext;
};

Seatbid.prototype = Object.create(RtbObject.prototype);

var SeatbidBuilder = function(){};

SeatbidBuilder.prototype.seat = function(seat){
  this._seat = seat;
  return this;
};

SeatbidBuilder.prototype.bid = function(bid){
  return new Promise(function (resolve, reject) {
    Promise.map(bid, function(b){
      if (b instanceof Bid){ //Bid is already created
        return b;
      } else {
        var builder = new BidBuilder();
        return builder
          .status(b.status)
          .nurl(b.nurl)
          .adm(b.adm)
          .adid(b.adid)
          .adomain(b.adomain)
          .id(b.id)
          .price(b.price)
          .cid(b.cid)
          .clearPrice(b.clearPrice)
          .crid(b.crid)
          .iurl(b.iurl)
          .impid(b.impid)
          .build();        
      }
    }).then(function(createdBid){
      this._bid = createdBid;
      resolve(this);
    }).catch(function(err){
      reject(err);
    });      
  });
};

SeatbidBuilder.prototype.group = function(group){
  this._group = group;
  return this;
};

SeatbidBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

SeatbidBuilder.prototype.build = function() {
  return new Promise(function (resolve, reject) {
    resolve(new Seatbid(this._seat, this._bid, this._group, this._ext));
  });
};

module.exports = {
  object: Seatbid,
  builder: SeatbidBuilder  
};