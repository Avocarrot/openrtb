# OpenRTB Objects

A Javascript library which builds and validates OpenRTB objects. This project was inspired by the good people at [Metamarkets](https://metamarkets.com/) who build a [similar library for Java](https://github.com/metamx/rad-tech-datatypes). 

## Installation

```npm install openrtb```

## Features

- Construct OpenRTB objects
- Convert objects from native Javascript structures to JSON strings
- Validate OpenRTB objects

## Basic Usage

### Construct a bid request
```javascript
    var builder = new BidRequestBuilder();
	builder
	.timestamp(moment.utc().format())
	.requestId('1234')
	.auctionType(2)
	.impressions([
	  {
	      "id":"1",
	      "native":{
	          "request": "{\"ver\":1,\"layout\":6,\"assets\":[{\"id\":0,\"req\":1,\"title\":{\"len\":25}},{\"id\":1,\"req\":1,\"img\":{\"type\":3,\"wmin\":300,\"hmin\":250}},{\"id\":2,\"req\":1,\"img\":{\"type\":1,\"wmin\":50,\"hmin\":50}},{\"id\":3,\"req\":1,\"data\":{\"type\":2,\"len\":90}},{\"id\":4,\"req\":0,\"data\":{\"type\":3}},{\"id\":5,\"req\":0,\"data\":{\"type\":12,\"len\":15}}]}"
	      },
	      "tagid": "eb09ff2a287598302fd631493949169b0d17f815",
	      "bidfloor": 1.3
	  }
	])
	.app({
	  "id":"55",
	  "name":"Test App",
	  "cat":["IAB3-1"],
	  "storeurl": "http://www.example.com",
	  "publisher":{  
	      "id": "6332"
	  }
	})
	.device({
		"dnt":0,
		"ua":"Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
		"ip":"76.174.49.222",
		"connectiontype":2,
		"devicetype":1,
		"didsha1": "bbc9ff2a287598302fd631693949169b0d17f215",
		"carrier": "o2",
		"make": "samsung GT-I9300",
		"model": "Android",
		"language": "en",
		"os": "Android",
		"osv": "5.1.1",
		"geo": {
		    "country": "UK"
		}
	})
	.user({
		"id":"55816b39711f9b5acf3b90e313ed29e51665623f",
		"yob": 1987,
		"gender": "M"
	})
	.ext({
		'extra': '1234'
	})
	.build()
	.then(function(bidRequest){
		//Do something with the object
	});
```

### Construct a bid response
```javascript
	var builder = new BidResponseBuilder();
	builder
	.timestamp(moment.utc().format())
	.status(1)
	.bidderName('test-bidder')
	.seatbid([ 
		{ 
		  bid: [ 
		    { 
				adid: 1,
				status: 1,
				clearPrice: 0.9,
				id: '819582c3-96b2-401a-b60d-7ac3c117a513',
				impid: 'e317ae49-8cd1-47b0-b022-02a8830182ce',
				price: 1.05,
				nurl: 'http://trackwin.com/win?pid=784170&data=OuJifVtEK&price=${AUCTION_PRICE}',
				adm: '{"native":{"assets":[{"id":0,"title":{"text":"Test Campaign"}},{"id":1,"img":{"url":"http://cdn.exampleimage.com/a/100/100/2639042","w":100,"h":100}},{"id":2,"img":{"url":"http://cdn.exampleimage.com/a/50/50/2639042","w":50,"h":50}},{"id":3,"data":{"value":"This is an amazing offer..."}},{"id":5,"data":{"value":"Install"}}],"link":{"url":"http://trackclick.com/Click?data=soDvIjYdQMm3WBjoORcGaDvJGOzgMvUap7vAw2"},"imptrackers":["http://trackimp.com/Pixel/Impression/?data=OuJifVtEKZqw3Hw7456F-etFgvhJpYOu0&type=img"]}}',
				cid: '9607',
				crid: '335224',
				adomain: ["example.com"]
		  	}
		  ]
		} 
	])
	.build()
	.then(function(bidResponse){
		//Do something with the object
	});
```

#### Additional fields in bid responses and bids

Bid responses have an extra field in addition to the normal RTB objects. They can have a status. The table below lists the possible values for a bid response status.

| Status  | Description  |
|---|---|
| 1  | Valid  |
| 2  | Timeout |
| 3  | Invalid JSON |
| 4  | HTTP Error  |

Bids have two extra fields in addition to the normal RTB objects. They can have a status and a clear price. These are helpful when keeping records of bid responses and trying to debug issues. The table below lists the possible values for a bid status.

| Status  | Description  |
|---|---|
| 1  | Won  |
| 2  | Lost on Price |
| 3  | Below floor  |
| 4  | Markup Delivery Failure  |
| 5  | Unscreenable  |
| 6  | Blocked by publisher  |
| 7  | Unverified creative  |
| 8  | Blocked advertiser  |
| 9  | Blocked content category  |
| 10  | Block creative attribute |

## Supported objects

### OpenRTB API Specification Version 2.3

- BidRequest
	- Imp
	- App
	    - Publisher
	- Device
	- User
     
- BidResponse
    - SeatBid
        - Bid 

### OpenRTB API Specification Version 2.2

Not supported but most objects for v2.3 should work for this one too.

## Disclaimer

This project is a work in progress. It was created for the specific purposes of the [Avocarrot Native Ad Exchange (AVX)](http://www.avocarrot.com/avx/) and some fields might be missing. If you want specific fields to be added then please either get in touch or [submit your own pull request](#contributing).

## Contributing

This project is work in progress and we'd love more people contributing to it. 

1. Fork the repo
2. Apply your changes
3. Write tests
4. Submit your pull request

For feedback or suggestions you can drop us a line at support@avocarrot.com