var RtbObject = require('../lib/rtbObject');

describe("The RtbObject should", function() {
  var rtbObject;
  before(function(){
    rtbObject = new RtbObject();
  });

  it("convert to JSON string", function() {
    rtbObject.prop1 = 'prop1';
    rtbObject.prop2 = {
      nestedProp: 'nestedProp'
    };
    rtbObject.prop3 = function(){
      return 'prop3';
    };
    var stringified = rtbObject.stringify();
    stringified.should.be.an.instanceOf(String);
    stringified.should.equal('{"prop1":"prop1","prop2":{"nestedProp":"nestedProp"}}');
  });



});
