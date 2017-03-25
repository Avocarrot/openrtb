var RtbObject = require('../rtbObject');
var removeEmptyValues = require('../utils').removeEmptyValues;

var User = function(gender, id, yob, buyeruid){
  this.gender = gender;
  this.id = id;
  this.yob = yob;
  this.buyeruid = buyeruid;
};

User.prototype = Object.create(RtbObject.prototype);

var UserBuilder = function(){};

UserBuilder.prototype.gender = function(gender){
  this._gender = gender;
  return this;
};

UserBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

UserBuilder.prototype.yob = function(yob){
  this._yob = yob;
  return this;
};

UserBuilder.prototype.buyeruid = function(buyeruid){
  this._buyeruid = buyeruid;
  return this;
};

UserBuilder.prototype.build = function() {
  var user = new User(this._gender, this._id, this._yob, this._buyeruid);
  return removeEmptyValues(user);
};

module.exports = {
  object: User,
  builder: UserBuilder
};