var seatbidSchema = require('./seatbidSchema');

var schema = {
  "properties": {
    "id": {
      "type": "string"
    },
    "seatbid": seatbidSchema,
    "bidId": {
      "type": "string"
    },
    "cur":{
      "type": "string"
    },
    "customdata":{
      "type": "string"
    },
    "nbr":{
      "type": "integer"
    },
    "ext":{
      "type": "object"
    }
  },
  "required": ["id"]
}

module.exports = schema;
