var Promise = require('bluebird'),
    SeatbidBuilder = require('./seatbid');

var BidResponse = function(timestamp, status, bidderName, seatbid){
  this.timestamp = timestamp;
  this.status = status;
  this.bidderName = bidderName;
  this.seatbid = seatbid;
};

var BidResponseBuilder = function(){};

BidResponseBuilder.prototype.timestamp = function(timestamp){
  this._timestamp = timestamp;
  return this;
};

BidResponseBuilder.prototype.status = function(status){
  this._status = status;
  return this;
};

BidResponseBuilder.prototype.bidderName = function(bidderName){
  this._bidderName = bidderName;
  return this;
};

BidResponseBuilder.prototype.seatbid = function(seatbid){
 this._seatbid = seatbid.map(function(sb){
    var builder = new SeatbidBuilder();
    return builder
      .bid(sb.bid)
      .build();
  });
  return this;
};

BidResponseBuilder.prototype.build = function() {
  return new Promise(function (resolve, reject) {
    if (!this._timestamp){
      reject(new Error('BidResponse should have a timestamp'));
    } else if (!this._status){
      reject(new Error('BidResponse should have a status'));
    } else {
      resolve(new BidResponse(
        this._timestamp,
        this._status,
        this._bidderName,
        this._seatbid
      ));
    }
  }.bind(this));
};

module.exports = BidResponseBuilder;