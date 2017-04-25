// The regex is borrowed from the great guys at Vungle: https://github.com/Vungle/openrtb-macrosub
var supportedMacros = ['PRICE', 'ID', 'CURRENCY', 'BID_ID', 'AD_ID', 'IMP_ID'];
var MACRO_PATTERN = new RegExp('\\$\\{AUCTION_(' + supportedMacros.join('|') + ')(:[A-Za-z0-9]+)?\\}', 'g');

exports.replaceMacros = function (str, valuesMap) {
  return str.replace(MACRO_PATTERN, function (valuesMap, match){
		return valuesMap[match] || match;
	}.bind(null, valuesMap));
}

var removeEmptyValues = function(obj) {
	if (typeof obj !== 'object') {
		return obj;
	}
	Object.keys(obj).forEach(function(key) {
		var property = obj[key];
		if (property !== null && typeof property === 'object') {
			obj[key] = removeEmptyValues(property);
		}
        if (typeof property === 'undefined' || property === null) {
            delete obj[key];
        }
	});
    return obj;
};

exports.removeEmptyValues = removeEmptyValues;
