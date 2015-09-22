// The regex is borrowed from the great guys at Vungle: https://github.com/Vungle/openrtb-macrosub
var supportedMacros = ['PRICE', 'ID'];
var MACRO_PATTERN = new RegExp('\\$\\{AUCTION_(' + supportedMacros.join('|') + ')(:[A-Za-z0-9]+)?\\}', 'g');

exports.replaceMacros = function (str, valuesMap) {
	return str.replace(MACRO_PATTERN, function (valuesMap, match){
		return valuesMap[match] || '';
	}.bind(null, valuesMap));
}