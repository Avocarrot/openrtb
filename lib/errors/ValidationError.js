var util = require('util');

/**
 * @param {String} message A message describing configuration error
 *
 * @constructor
 */
var ValidationError = function (obj) {
  Error.captureStackTrace(this, this);
  this.message = obj.message;
  this.errors = obj.errors;
};

util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;