# OpenRTB Objects

A Javascript library which builds and validates OpenRTB objects. This project was inspired by the good people at [Metamarkets](https://metamarkets.com/) who build a [similar library for Java](https://github.com/metamx/rad-tech-datatypes). 

## Features

- Construct OpenRTB objects
- Validate OpenRTB objects
- Convert objects from native to JSON format

## Usage

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
	  "id":"55816b39711f9b5acf3b90e313ed29e51665623f"
	})
	.ext({
		'extra': '1234'
	})
	.build()
	.then(function(bidRequest){
		//Do something with the object
	});
```

## Contributing

This project is work in progress and we'd love more people contributing to it. 

1. Fork the repo
2. Apply your changes
3. Write tests
4. Submit your pull request

For feedback or suggestions you can drop us a line at support@avocarrot.com