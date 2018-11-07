var CuteTool = require("../tools.js");

function ApiUploadAvater(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var config = tool.GetConfig();    
        var url = config.GetUploadAvater();            
        var response = tool.GetResponse();

        if(!data.userType || !data.userId || !data.appId){
            callback(response.BadParam());
        }else{
            var param = {
                appId : data.appId,
                openId : data.openid,
                userType : data.userType,
                token : data.token,
                userId : data.userId
            }

            https.Post(url, param, function(e){
                callback(response.Succ({text:e.data}));
            });
        }    
    }
}

module.exports = ApiUploadAvater;