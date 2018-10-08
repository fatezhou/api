var CuteTool = require("./../tools.js");

function ApiGetFamily(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var logger = tool.GetLogger();
        var response = tool.GetResponse();
        var https = tool.GetHttps();
        var config = tool.GetConfig();

        if(!data.studentId){
            callback(response.BadApi());
        }else{
            var url = config.GetFamilyUrl();
            url += "?detail=1&studentId=" + data.studentId;
            https.Get(url, function(e){
                var strJson = e.toString();
                var res = JSON.parse(strJson);
                console.info(res);
                if(res.success){                    
                    callback(response.Succ({parents:res.data.parents}));
                }else{
                    callback(response.BadApi());
                }
            });
        }    
    }


}

module.exports = ApiGetFamily;