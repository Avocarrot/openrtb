var schema = {
  	"type": "object",
  	"properties": {
		"w": {
		  "type": "integer"
		},
		"h": {
		  "type": "integer"
		},
		"wmax": {
		  "type": "integer"
		},
		"hmax": {
		  "type": "integer"
		},
		"wmin": {
		  "type": "integer"
		},
		"hmin": {
		  "type": "integer"
		},
		"id": {
		  "type": "string"
		},
		"btype": {
	      "type": "array",
	      "items": {
	        "type": "integer"
	      }
	    },
	    "battr": {
	      "type": "array",
	      "items": {
	        "type": "integer"
	      }
	    },
		"pos": {
		  "type": "integer"
		},
		"mimes": {
	      "type": "array",
	      "items": {
	        "type": "string"
	      }
	    },
		"topframe": {
		  "type": "integer"
		},
		"expdir": {
	      "type": "array",
	      "items": {
	        "type": "integer"
	      }
	    },
	    "api": {
	      "type": "array",
	      "items": {
	        "type": "integer"
	      }
	    },
		"ext": {
		  "type": "object"
		}
  	}
}

module.exports = schema;