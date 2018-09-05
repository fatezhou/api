function ApiLogin(){
    this.Service = function(version, data, callback){
        this.callback = callback;
        var CuteHttps = require("./../https.js");
        var cuteHttps = new CuteHttps;
        var strUrl = "https://ouat.buzaishudian.com/api/mini/user-id?appid=" + data.appid + "&code=" + data.code;
        function ResponseCallback(data){
            var res = {code:0, data:{}};
            if(data.success)
                res.data = data.data;
            else
                res.code = 1;
            callback(res);
        }
        cuteHttps.Get(strUrl, ResponseCallback);   
    }
}

module.exports = ApiLogin;