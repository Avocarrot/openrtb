var App = function(storeurl, cat, id, name, publisher){
  this.storeurl = storeurl;
  this.cat = cat;  
  this.id = id;  
  this.name = name;  
  this.publisher = publisher;
};

var AppBuilder = function(){};

AppBuilder.prototype.storeurl = function(storeurl){
  this._storeurl = storeurl;
  return this;
};

AppBuilder.prototype.cat = function(cat){
  this._cat = cat;
  return this;
};

AppBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

AppBuilder.prototype.name = function(name){
  this._name = name;
  return this;
};

AppBuilder.prototype.publisher = function(publisher){
  this._publisher = publisher;
  return this;
};

AppBuilder.prototype.build = function() {
  return new App(this._storeurl, this._cat, this._id, this._name, this._publisher);
};

module.exports = AppBuilder;