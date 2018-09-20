var CuteTool = require("../tools.js");

function ApiGetTeacherInfo(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        var config = tool.GetConfig();
        var url = config.GetTeacherInfoByPhone();
		var response = tool.GetResponse();

		url += "?unionid=" + data.unionid;
        //url += "?phone=" + data.phone||"";//先这么写, 再优化
    
        https.Get(url, function(e){
			console.info(typeof(e));
			var res = {};
			try{
				e = JSON.parse(e);
			}catch(err){
				e = {success:false};
			}
			if(e.success){
				res.teacherInfo = e.data;
			}else{
				res.teacherInfo = {};
			}
            callback(response.Succ(res));
        });
    }
}

module.exports = ApiGetTeacherInfo;