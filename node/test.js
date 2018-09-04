var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var str = "/url?a=1&b=2";
console.info(querystring.parse(str));



http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var param = url.parse(req.url, true).query;
    console.info(url.parse(req.url, true).pathname);
    console.info(param);
    res.end();
}).listen(3000);