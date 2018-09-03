function ApiGetContact(){
    this.Service = function(version, postData){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        var res = db.Query("");
        if(res.code == 0){
            return {code:0, data:{contact:res.dataArray}};
        }else{
            return {code:res.code, data:{}};
        }     
    }
}

module.exports = ApiGetContact;