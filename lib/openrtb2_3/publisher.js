var RtbObject = require('../rtbObject');

var Publisher = function(id, name){
  this.id = id;  
  this.name = name;  
};

Publisher.prototype = Object.create(RtbObject.prototype);

var PublisherBuilder = function(){};

PublisherBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

PublisherBuilder.prototype.name = function(name){
  this._name = name;
  return this;
};

PublisherBuilder.prototype.build = function() {
  return new Publisher(this._id, this._name);
};

module.exports = {
  object: Publisher,
  builder: PublisherBuilder  
};