

function ApiGetProfile(){
    this.Service = function(version, data, callback){
        var CuteHttps = require("./../https.js");
        var cuteHttps = new CuteHttps;
        var CuteConfig = require("./../config.js");
        var cuteConfig = new CuteConfig;
        var strUrl = "" + cuteConfig.GetParentProfileInfoUrl() + "?openid=" + data.openid + "&unionid=" + data.unionid;
        function ResponseCallback(data){
            var res = {code:0, data:{profile:{}}};
            if(data.success)
                res.data.profile = data.data;
            else
                res.code = 1;
            callback(res);
        }
        cuteHttps.Get(strUrl, ResponseCallback);   
    }
}

module.exports = ApiGetProfile;