function ApiLogin(){
    this.Service = function(version, data, callback){
        var CuteHttps = require("./../https.js");
        var cuteHttps = new CuteHttps;
		var CuteConfig = require("./../config.js");
        var cuteConfig = new CuteConfig;
        var strUrl = cuteConfig.GetLoginUrl() + "?appid=" + data.appid + "&code=" + data.code;
        function ResponseCallback(data){
            var res = {code:0, data:{}};
			console.info(data);
			try{
				data = JSON.parse(data);
			}catch(error){
				data = {message:"error", data:{}, success:false};
			}
			
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