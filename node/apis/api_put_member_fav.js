var CuteTool = require("./../tools.js");

function ApiPutMemberFav(){
    this.Service = function(version, postData, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var config = tools.GetConfig();
        var response = tools.GetResponse();

        
    }
}

module.exports = ApiPutMemberFav;