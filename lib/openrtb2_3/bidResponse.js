var util = require('util');
var RtbObject = require('../rtbObject');
var SeatbidBuilder = require('./seatbid').builder;
var validator = require('../validator');
var bidResponseSchema = require('./schemas/bidResponse');
var ValidationError = require('../errors/ValidationError');
var removeEmptyValues = require('../utils').removeEmptyValues;

var BidResponse = function(timestamp, status, bidderName, seatbid, id){
  this.timestamp = timestamp;
  this.status = status;
  this.bidderName = bidderName;
  this.seatbid = seatbid;
  this.id = id;
};

BidResponse.prototype = Object.create(RtbObject.prototype);

BidResponse.prototype.forEachBid = function(cb) {
  this.seatbid.forEach(function(sb) {
    sb.bid.forEach(cb);
  });
};

var BidResponseBuilder = function(){};

BidResponseBuilder.prototype.timestamp = function(timestamp){
  this._timestamp = timestamp;
  return this;
};

BidResponseBuilder.prototype.id = function(id){
  this._id = id;
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

BidResponseBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidResponseBuilder.prototype.build = function() {
  var _seatbid = this._seatbid.map(function(sb) {
    return sb;
  });

  this._seatbid = _seatbid;
  var bidResponse = new BidResponse(
    this._timestamp || new Date().toISOString(),
    this._status,
    this._bidderName,
    this._seatbid,
    this._id
  );

  bidResponse = removeEmptyValues(bidResponse);

  var validationErrors = validator.validate(bidResponseSchema, bidResponse);

  if(validationErrors.length > 0){
    throw new ValidationError({
      message: "Validation failed",
      errors: validationErrors
    });
  }
  return bidResponse;
};

module.exports = {
  object: BidResponse,
  builder: BidResponseBuilder
};