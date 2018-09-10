var CuteRouter = require("./router.js");
var http = require("http");
var url = require("url");
var router = new CuteRouter();
var port = 20000;
if(process.argv.length > 2){
    port = parseInt(process.argv[2]);
}

http.createServer(function(req, res){
    console.info(req.url);
    if(router.IsVaild(req.url) == false){
        res.writeHead(503, {'Content-Type': 'text/html; charset=utf8'});
        res.write(JSON.stringify({code:503, text:"forbidden!"}));
        res.end();
        return;
    }
    
    var urlPath = url.parse(req.url).pathname;
    var data = "";
    req.on('data', function(chunk){
        data += chunk.toString();
    });
    req.on('end', function(){
        console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
            router.Service(JSON.parse(data), urlPath, function(json){                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                console.info(json);
                res.write(JSON.stringify(json));
                res.end();
            });

        //debug
        // try{
        //     console.info("on request end, data:\n" + data + ", url:\n" + urlPath);
        //     router.Service(JSON.parse(data), urlPath, function(json){                
        //         res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        //         console.info(json);
        //         res.write(JSON.stringify(json));
        //         res.end();
        //     });
        // }catch(err){
        //     res.writeHead(503, {'Content-Type': 'text/html; charset=utf8'});
        //     res.write(JSON.stringify({code:503, text:"deal service error"}));
        //     res.end();
        // }        
    });
}).listen(port);

console.info("server work on port:" + port);