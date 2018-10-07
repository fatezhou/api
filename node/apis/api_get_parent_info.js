var CuteTool = require("../tools.js");

function ApiGetParentInfo(){
    this.Service = function(version, data, callback){
        console.info("ApiGetParentInfo");
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var response = tool.GetResponse();
        var config = tool.GetConfig();
    
        var url = config.GetParentsUrl();
        url += "?pages=9999";//先这么写, 再优化
    
        https.Get(url, function(e){
            console.info(e);
            try{
                var strJson = e.toString();
                e = JSON.parse(strJson);
            }catch(err){
                e.error = true;
            }
            if(e.error){
                callback(response.BadApi());
            }else{
                callback(response.Succ({records:e.data.records}));
            }           
        })
    }
}

module.exports = ApiGetParentInfo;
