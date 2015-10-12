var nconf = require('nconf');
var util = require('util');

nconf.argv()
   .env()
   .file({ file: util.format('%s/lib/schemas/bidResponseSchema.json', process.cwd() ) })
   .load();

var Promise = require('bluebird');
var util = require('util');
var Ajv = require('ajv');
var RtbObject = require('../rtbObject');
var SeatbidBuilder = require('./seatbid').builder;

var schemaFile = nconf.get('schema');

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

BidResponseBuilder.prototype.validateBidResponse = function(bidResponse, schemaValidator){
  var validate = schemaValidator.compile(schemaFile);
  var valid = validate(bidResponse);
  return valid ? "Bid Response is valid" : validate.errors;
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
        var schemaValidator = Ajv();
        this.validateBidResponse({}, schemaValidator);

        resolve(new BidResponse(
          this._timestamp || new Date().toISOString(),
          this._status,
          this._bidderName,
          this._seatbid
        ).removeUndefined());
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