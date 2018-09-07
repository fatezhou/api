var CuteTool = require("./../tools.js");

function ApiGetGrowthRecords(){
    this.Service = function(version, postData){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var res = db.Query("");
        if(res.code == 0){
            return {code:0, data:{records:res.dataArray}};
        }else{
            return {code:res.code, data:{}};
        }     
    }
}

module.exports = ApiGetGrowthRecords;