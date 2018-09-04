var http = require('http')

function CuteHttp(){
    this.Request = function(opt){
        var options = {
            method: opt.method,
            host: opt.url,
            path: opt.path, 
            port:opt.port,
            headers: opt.headers || {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
        }
        var req = http.request(options, function(res){
            console.info("Status:" + res.statusCode);
            res.setEncoding("utf8");
            res.on("data", function(chuck){
                if(opt.responseData)
                    opt.responseData(chuck);
            });
            if(opt.response)
                opt.response(res);
        });
        if(opt.requestError){
            req.on("error", opt.requestError);
        }        
        if(opt.method == "POST"){
            req.write(opt.postData);
        }
        req.end();
    }
}
/*
var obj = new CuteHttp();
obj.Request({
    method: "POST",
    url: "api.minidope.com",
    port:80,
    path: "/login",
    requestError:function(e){console.info(e);},    
    //response:function(e){console.info(e);},
    responseData:function(data){console.info("recv:" + data);},
    postData:"Hello"
})
*/

module.exports = CuteHttp;