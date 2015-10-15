var Ajv = require('ajv');

var Validator = function(){};

var schemaValidator = Ajv();

Validator.prototype.validate = function(schema, object){
  var validate = schemaValidator.compile(schema);
  return validate(object) ? [] : validate.errors;
}

module.exports = Validator;