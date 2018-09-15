var CuteTool = require("../tools.js");

function ApiGetTeachers(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var response = tool.GetResponse();     
		var config = tool.GetConfig();		
        var url = config.GetTeathersUrl();
        url += "?startPage=" + (data.startPage||"") + "&pageSize=" + (data.pageSize||"") + "&pages=" + (data.pages||"");//先这么写, 再优化
    
        https.Get(url, function(e){
            try{
                e = JSON.parse(e);
            }catch(error){
                e = {data:{records:[]}};
            }
            callback(response.Succ({teachers:e.data.records}));
        });
    }    
}

module.exports = ApiGetTeachers;