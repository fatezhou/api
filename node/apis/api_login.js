function ApiLogin(){
    this.Service = function(version, postData){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        var res = db.Query("");
        if(res.code == 0){
            return {code:0, data:{memberId:res.memberId, type:res.type}};
        }else{
            return {code:res.code, data:{}};
        }     
    }
}

module.exports = ApiLogin;