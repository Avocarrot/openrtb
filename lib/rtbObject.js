var RtbObject = function(){};

RtbObject.prototype.stringify = function(){
  return JSON.stringify(this);
};

RtbObject.prototype.removeUndefined = function(){
	for (var prop in this) {
        if (this.hasOwnProperty(prop) && typeof this[prop] === 'undefined') {
            delete this[prop];
        }
    }
    return this;
};

module.exports = RtbObject;