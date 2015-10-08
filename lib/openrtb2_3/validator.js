var RtbObject = require('../rtbObject');
var _ = require('underscore');

var Validator = function(){};

Validator.prototype.validate = function(bidResponse) {
	var bidResponse = JSON.parse(bidResponse);
	if(_.isNull(bidResponse.id) || _isUndefined(bidResponse.id)){
		return new Error("Invalid bidResponse: bidResponse should have an id");
	} else if(_.isNull(bidResponse.bidId) || _isUndefined(bidResponse.bidId)){
		return new Error("Invalid bidResponse: bidResponse should have a bidId");
	} else if(_.isUndefined(bidResponse.seatbid) || bidResponse.seatbid.length === 0){
		return new Error("Invalid bidResponse: Seatbid should contain at least one bid");
	}

	else if (_.isUndefined(bidResponse.seatbid[0].bid[0].adm) || _.isNull(bidResponse.seatbid[0].bid[0].adm)) {
		return new Error("Invalid bidResponse: No adm present");
	}
}

module.exports = Validator;