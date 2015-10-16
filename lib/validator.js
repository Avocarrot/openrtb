var Ajv = require('ajv');

var schemaValidator = Ajv();

exports.validate = function(schema, object){
  var validate = schemaValidator.compile(schema);
  return validate(object) ? [] : validate.errors;
}
