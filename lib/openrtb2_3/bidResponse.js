var Promise = require('bluebird');
var util = require('util');
var Ajv = require('ajv');
var fs = require('fs');
var RtbObject = require('../rtbObject');
var SeatbidBuilder = require('./seatbid').builder;

var schema = JSON.parse(fs.readFileSync(util.format('%s/lib/schemas/bidResponseSchema.json', process.cwd()), "utf-8"));
var schemaValidator = Ajv();

var BidResponse = function(timestamp, status, bidderName, seatbid, id){
  this.timestamp = timestamp;
  this.status = status;
  this.bidderName = bidderName;
  this.seatbid = seatbid;
  this.id = id;
};

BidResponse.prototype = Object.create(RtbObject.prototype);

var BidResponseBuilder = function(){};

BidResponseBuilder.prototype.timestamp = function(timestamp){
  this._timestamp = timestamp;
  return this;
};

BidResponseBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

BidResponseBuilder.prototype.validateBidResponse = function(bidResponse){
  var validate = schemaValidator.compile(schema);
  var valid = validate(bidResponse);
  if(!valid){
    bidResponse.status = 3;
    return validate.errors;
  } else {
    return [];
  }
}

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
    if (!this._status){
      reject(new Error('BidResponse should have a status'));
    } else {
      Promise.map(this._seatbid, function(sb){
        return sb;
      }).bind(this).then(function(_seatbid){
        this._seatbid = _seatbid;

        var bidResponse = new BidResponse(
              this._timestamp || new Date().toISOString(),
              this._status,
              this._bidderName,
              this._seatbid,
              this._id
            ).removeUndefined();

        var validationErrorsArray = this.validateBidResponse(bidResponse);

        resolve({
         bidResponse: bidResponse,
         meta: {
          validationErrors: validationErrorsArray
         }  
        });
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