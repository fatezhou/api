var CuteRouter = require("./router.js");
var obj = new CuteRouter();
var res;
if(obj.IsVaild("/api/v1.0/login1")){
    res = obj.Service("{}");
}else{
    res = obj.BadApi();
}
var strJson = JSON.stringify(res);
console.info(strJson);