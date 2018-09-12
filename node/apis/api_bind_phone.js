var CuteTool = require("../tools.js");

function ApiBindPhone(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        
        var url = "https://ouat.buzaishudian.com/api/mini/phone-bind";
        var param = {
            unionid : data.unionid,
            openid : data.openid,
            phone : data.phone,
            vcode : data.vcode,
            userType : data.userType == 3 ? 1 : 2,
            token : data.token
        }
    
        https.Post(url, param, function(e){
            callback({text:e.message});
        });
    }
}

module.exports = ApiBindPhone;