var schema = {
  	"type": "object",
  	"properties": {
		"id": {
	  		"type": "string"
		},
		"name": {
		  "type": "string"
		},
		"cat": {
		    "type": "array",
		    "items": {
		        "type": "string"
		    }
		},
		"domain": {
		  "type": "string"
		},
		"ext": {
		  "type": "object"
		}
 	}
}