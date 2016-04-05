#v3.1.0

- Added `BidResponse.forEachBid(cb)` function which calls `cb` on each bid in each seatbid in the response. 

#v3.0.0

##Breaking changes

- Bid.replaceMacros now accepts the string that contains the MACROS we want to replace as the first argument.
Returns the new String. 
