var CuteTool = require("../tools.js");

function ApiBindPhone(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var logger = tool.GetLogger();
		var response = tool.GetResponse();
		var config = tool.GetConfig();
        
        var url = config.GetBindPhoneUrl();
        var param = {
            unionid : data.unionid,
            openid : data.openid,
            phone : data.phone,
            vcode : data.vcode,
            userType : data.userType == 1 ? 3 : 2,
            token : data.token
        }
    
        https.Post(url, param, function(e){
			logger.debug(typeof(e));
			logger.debug(e);
			try{
				e = JSON.parse(e);
				console.info(e);
			}catch(error){
				e = {message:"error"};
			}			
			logger.debug("after JSON");
            callback(response.Succ({text:e.message}));
        });
    }
}

module.exports = ApiBindPhone;