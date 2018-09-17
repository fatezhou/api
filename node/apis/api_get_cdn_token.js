var CuteTool = require("../tools.js");

function ApiGetCdnToken(){
    var tool = new CuteTool;
    var https = tool.GetHttps();
    var response = tool.GetResponse();
    var logger = tool.GetLogger();
    this.Service = function(version, data, callback){
        callback(response.Succ({token:'1'}));
    }
}

module.exports = ApiGetCdnToken;