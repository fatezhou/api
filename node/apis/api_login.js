function ApiLogin(){
    this.Service = function(version, data, callback){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        //var res = db.Query("");
        var res = {
            "openId": "oO8zy0yAhxBcEwEnPahvblLIGe18",
            "unionId": "oa1h32opKa_jy5QNr7J7sQp1Qhl8", // 可能为空
            "token": "8102b22a5e81e840176d9f381ec6f837" // sessionKey 的加密字符串，用于扣款时的身份验证
        }
        if(res.code == 0){
            return {code:0, data:res};
        }else{
            return {code:res.code, data:{}};
        }     
    }
}

module.exports = ApiLogin;