var bidSchema = require('./bid');

var schema = {
  	"type": "array",
  	"items": {
    	"type": "object",
    	"properties": {
      		"bid": bidSchema
		}
	}
}

module.exports = schema;