var RtbObject = function(){};

RtbObject.prototype.stringify = function(){
  return JSON.stringify(this);
};

module.exports = RtbObject;