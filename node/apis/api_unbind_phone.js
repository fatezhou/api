var CuteTool = require("../tools.js");

function ApiUnBindPhone(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        
        var url = "https://ouat.buzaishudian.com/api/mini/phone-unbind";
        var param = {
            unionid : data.unionid,
            openid : data.openid,
            userType : data.userType == 3 ? 1 : 2,
            token : data.token
        }
    
        https.Post(url, param, function(e){
            callback({text:e.message});
        });
    }
}

module.exports = ApiUnBindPhone;