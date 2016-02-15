var RtbObject = function(){};

RtbObject.prototype.stringify = function(){
  return JSON.stringify(this);
};

RtbObject.prototype.removeEmptyValues = function(){
	var that = this;
	Object.keys(this).forEach(function(key) {
		var property = that[key];
        if (typeof property === 'undefined' || property === null) {
            delete that[key];
        }		
	});
    return this;
};

module.exports = RtbObject;