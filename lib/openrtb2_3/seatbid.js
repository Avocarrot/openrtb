var util = require('util'),
    BidBuilder = require('./bid');

var Seatbid = function(seat, bid){
  this.seat = seat;
  this.bid = bid;
};

var SeatbidBuilder = function(){};

SeatbidBuilder.prototype.seat = function(seat){
  this._seat = seat;
  return this;
};

SeatbidBuilder.prototype.bid = function(bid){
  this._bid = bid.map(function(b){
    var builder = new BidBuilder();
    return builder
      .status(b.status)
      .adid(b.adid)
      .adomain(b.adomain)
      .id(b.id)
      .price(b.price)
      .cid(b.cid)
      .clearPrice(b.clearPrice)
      .crid(b.crid)
      .impid(b.impid)
      .build();
  });
  return this;
};

SeatbidBuilder.prototype.build = function() {
  return new Seatbid(this._seat, this._bid);
};

module.exports = SeatbidBuilder;