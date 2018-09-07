var CuteRouter = require("./router.js");
var http = require("http");
var url = require("url");
var router = new CuteRouter();
var port = 20000;
if(process.argv.length > 2){
    port = parseInt(process.argv[2]);
}

http.createServer(function(req, res){
    if(router.IsVaild(req.path) == false){
        res.writeHead(503, {'Content-Type': 'text/html; charset=utf8'});
        res.write(JSON.stringify({code:503, text:"forbidden!"}));
        res.end();
        return;
    }
    
    var urlPath = url.parse(req.url).pathname;
    var data;
    req.on('data', function(chunk){
        data += chunk;
    });
    req.on('end', function(){
        try{
            router.Service(JSON.parse(data), urlPath, function(json){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(JSON.stringify(json));
            });
        }catch(err){
            res.writeHead(503, {'Content-Type': 'text/html; charset=utf8'});
            res.write(JSON.stringify({code:503, text:"error request!"}));
        }        
        res.end();
    })
}).listen(port);

console.info("server work on port:" + port);