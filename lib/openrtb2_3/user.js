var User = function(gender, id, yob){
  this.gender = gender;
  this.id = id;  
  this.yob = yob;  
};

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

UserBuilder.prototype.build = function() {
  return new User(this._gender, this._id, this._yob);
};

module.exports = UserBuilder;