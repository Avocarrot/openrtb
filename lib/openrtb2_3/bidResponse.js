var Promise = require('bluebird'),
    RtbObject = require('../rtbObject'),
    Seatbid = require('./seatbid').object,
    SeatbidBuilder = require('./seatbid').builder;

var BidResponse = function(timestamp, status, bidderName, seatbid){
  this.timestamp = timestamp;
  this.status = status;
  this.bidderName = bidderName;
  this.seatbid = seatbid;
};

BidResponse.prototype = Object.create(RtbObject.prototype);

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
  return new Promise(function (resolve, reject) {
    Promise.map(seatbid, function(sb){
      if (sb instanceof Seatbid){ //Seatbid is already created
        return sb;
      } else {
        var builder = new SeatbidBuilder();
        return builder
          .bid(sb.bid)
          .then(function(){
            return builder.build();
          });
      }
    }).bind(this).then(function(createdSeatbid){
      this._seatbid = createdSeatbid;
      resolve(this);
    }).catch(function(err){
      reject(err);
    });
  }.bind(this));
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

module.exports = {
  object: BidResponse,
  builder: BidResponseBuilder  
};