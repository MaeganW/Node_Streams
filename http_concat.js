var concat = require('concat-stream')
var http = require('http')
var qs = require('querystring')
// add through stream to restric how much data is coming in
var through = require('through2')

var server = http.createServer(function (req, res){
	req
		.pipe(countBytes())
		.pipe(concat({encoding: 'string'}, onBody))

	function onBody(body){
		var params = qs.parse(body)
		console.log(params);
		res.end('ok\n');
	}

	function countBytes(){
		var size = 0;
		return through(function(buf, enc, next){
			size += buf.length
			// this will truncate the stdin if it exceed 20 characters -> will send back an ok when curling but it will not parse the data on the server
			if(size > 20) next(null, null)
			else next(null, buf)
		})
	}
})
server.listen(5000)

// ==== To Use ====
// in first terminal type node http_concat.js
// in second terminal type curl -d msg=hello localhost:5000
