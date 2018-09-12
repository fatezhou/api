var CuteTool = require("../tools.js");

function ApiPhoneVcode(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        
        var url = "https://ouat.buzaishudian.com/api/mini/phone-vcode";
        var param = {
            unionid : data.unionid,
            openid : data.openid,
            userType : data.userType == 3 ? 1 : 2,
            phone : data.phone
        }
    
        https.Post(url, param, function(e){
            callback({text:e.message});
        });
    }
}

module.exports = ApiPhoneVcode;