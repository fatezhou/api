var CuteTool = require("../tools.js");

function ApiPhoneVcode(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var logger = tool.GetLogger();
		var response = tool.GetResponse();
		var config = tool.GetConfig();
        logger.debug("ApiPhoneVcode");
        
        var url = config.GetVCode();
        var param = {
            unionId : data.unionid,
            openId : data.openid,
            userType : data.userType == 1 ? 3 : 2,
            phone : data.phone
        }
		
		logger.debug(param);
    
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

module.exports = ApiPhoneVcode;