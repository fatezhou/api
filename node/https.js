var https = require("https");
function CuteHttps(){
    this.Get = function(url, callback){
        console.info(url);
        https.get(url, function(res){
            res.on('data', callback);
        }).end();
    };
    this.Post = function(url, data, callback){
        //https.request({})
    }
}
/*
var obj = new CuteHttps;
obj.Get("https://ouat.buzaishudian.com/test/api/students", function(data){
    //process.stdout.write(data);
    console.info(data.toString());
})
*/

module.exports = CuteHttps;