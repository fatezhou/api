var CuteTool = require("../tools.js");

function ApiGetTeacherInfo(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var https = tool.GetHttps();
        
        var url = "https://ouat.buzaishudian.com/api/teacher-info?";
        url += "teacherid=" + data.teacherId + "&phone=" + data.phone||"";//先这么写, 再优化
    
        https.Get(url, function(e){
            callback({teacherInfo:e.data});
        });
    }
}

module.exports = ApiGetTeacherInfo;