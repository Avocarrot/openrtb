var Promise = require('bluebird'),
    util = require('util'),
    RtbObject = require('../rtbObject'),
    SeatbidBuilder = require('./seatbid').builder;

var BidResponse = function(timestamp, status, bidderName, seatbid){
  this.timestamp = timestamp;
  this.status = status;
  this.bidderName = bidderName;
  this.seatbid = seatbid;
};

BidResponse.prototype = Object.create(RtbObject.prototype);

BidResponse.prototype.getBid = function(bidId){
  return new Promise(function (resolve, reject) {
    var foundBid;
    Promise.each(this.seatbid, function(sb){
      return Promise.each(sb.bid, function(bid){
        if (bid.id === bidId){
          foundBid = bid;
        }
      });
    }).bind(this).then(function(){
      if (foundBid){
        resolve(foundBid);
      } else {
        reject(new Error(util.format('Bid with id %s was not found', bidId)));
      }
    });
  }.bind(this));
};

BidResponse.prototype.setBidStatus = function(bidId, status){
  return new Promise(function (resolve, reject) {
    this.getBid(bidId).then(function(bid){
      bid.status = status;
      resolve();
    }).catch(function(err){
      reject(err);
    });
  }.bind(this));
};

BidResponse.prototype.setBidClearPrice = function(bidId, clearPrice){
  return new Promise(function (resolve, reject) {
    this.getBid(bidId).then(function(bid){
      bid.clearPrice = clearPrice;
      resolve();
    }).catch(function(err){
      reject(err);
    });
  }.bind(this));
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
      Promise.map(this._seatbid, function(sb){
        return sb;
      }).bind(this).then(function(_seatbid){
        this._seatbid = _seatbid;
        resolve(new BidResponse(
          this._timestamp,
          this._status,
          this._bidderName,
          this._seatbid
        ));
      }).catch(function(err){
        reject(err);
      });
    }
  }.bind(this));
};

module.exports = {
  object: BidResponse,
  builder: BidResponseBuilder  
};