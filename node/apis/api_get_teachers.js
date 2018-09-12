var CuteTool = require("../tools.js");

function ApiGetTeachers(){
    var tool = new CuteTool;
    var https = tool.GetHttps();
    
    var url = "https://ouat.buzaishudian.com/api/teachers?";
    url += "startPage=" + data.startPage||"" + "&pageSize=" + data.pageSize||"" + "&pages=" + data.pages||"";//先这么写, 再优化

    https.Get(url, function(e){
        callback({teachers:e.data.records});
    });
}

module.exports = ApiGetTeachers;