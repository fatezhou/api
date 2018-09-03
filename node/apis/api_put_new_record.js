function ApiPutNewRecord(){
    this.Service = function(version, postData){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        var res = db.Exec("");
        if(res.code == 0){
            return {code:0, data:{records:res.dataArray}};
        }else{
            return {code:res.code, data:{}};
        }     
    }
}

module.exports = ApiPutNewRecord;