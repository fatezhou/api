var CuteTool = require("../tools.js");

function ApiPhoneVcode(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var logger = tool.GetLogger();
        logger.debug("ApiPhoneVcode");
        
        var url = "https://test.buzaishudian.com/api/mini/phone-vcode";
        var param = {
            unionid : data.unionid,
            openid : data.openid,
            userType : data.userType == 3 ? 1 : 2,
            phone : data.phone
        }
    
        https.Post(url, param, function(e){
			logger.debug(e);
			try{
				e = JSON.parse(e);
			}catch(error){
				e = {message:"error"};
			}
            callback({text:e.message});
        });
    }
}

module.exports = ApiPhoneVcode;