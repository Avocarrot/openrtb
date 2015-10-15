var util = require('util');

/**
 * @param {String} message A message describing configuration error
 *
 * @constructor
 */
var ValidationError = function (message) {
  Error.captureStackTrace(this, this);
  this.message = message;
};

util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;