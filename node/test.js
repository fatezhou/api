var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var param = url.parse(req.url, true).query;
    console.info(url.parse(req.url, true).pathname);
    console.info(param);
    //var CuteTool = require("./tools.js");
    //var tool = new CuteTool;
    
    //console.info(tool.GetResponse().BadApi());
    res.end();
}).listen(3000);