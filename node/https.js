var https = require("https");
function CuteHttps(){
    this.Get = function(url, callback){
        console.info(url);
        https.get(url, function(res){
            var data = "";
            res.on('data', function(chunk){
                data += chunk.toString();
            });            
            res.on('end', function(){
                callback(data);
            });
            res.on('error', function(e){
                console.info(e);
            });
        }).end();
    };
    this.Post = function(url, data, callback){
        var urlObject = require("url").parse(url, true);
        var res_data = "";
        var req = https.request({
            host: urlObject.host,
            path: urlObject.path,
            method: "POST",
            json: true,
			headers:{
                'Content-Type' : 'application/json',
                //'content-type': 'application/x-www-form-urlencoded'
                'Content-Length': Buffer.byteLength(JSON.stringify(data))
            },
            //rejectUnauthorized: false
        }, function(res){
            res.setEncoding("utf8");
            res.on('data', function(chuck){
				res_data += chuck.toString();
			});
            res.on('end', function(){
				callback(res_data);
			});
        });
        req.on('error', function(e){console.info(e);});
        strJson = JSON.stringify(data);
        console.info("POST Param", strJson);
        req.write(strJson);
        req.end();
        console.info("post end");
    }
}
/*
var obj = new CuteHttps;
obj.Get("https://ouat.buzaishudian.com/test/api/students", function(data){
    //process.stdout.write(data);
    console.info(data.toString());
})
*/
// var obj = new CuteHttps;
// obj.Post("https://ouat.buzaishudian.com/test/api/students", "a=10", function(d){console.info(d);});
module.exports = CuteHttps;