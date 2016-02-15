var RtbObject = require('../lib/rtbObject');

describe("The RtbObject should", function() {
  var rtbObject;
  beforeEach(function(){
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

  it("removes properties witn null or undefined values", function() {
    rtbObject.prop1 = 'prop1';
    rtbObject.prop2 = null;
    rtbObject.prop3 = undefined;
    var cleaned = rtbObject.removeEmptyValues();
    cleaned.should.have.property('prop1', 'prop1');
    cleaned.should.not.have.property('prop2');
    cleaned.should.not.have.property('prop3');
  });

});
