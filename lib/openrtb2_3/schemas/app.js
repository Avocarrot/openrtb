var publisherSchema = require('./publisher');

var schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "bundle": {
      "type": "number"
    },
    "domain": {
      "type": "string"
    },
    "storeurl": {
      "type": "string"
    },
    "cat": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "sectioncat": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "pagecat": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ver": {
      "type": "string"
    },
    "privacypolicy": {
      "type": "integer"
    },
    "paid": {
      "type": "integer"
    },
    "publisher": publisherSchema,
    "content": {
      "type": "object"
    },
    "keywords": {
      "type": "string"
    },
    "ext": {
      "type": "object"
    }
  }
}

module.exports = schema;
