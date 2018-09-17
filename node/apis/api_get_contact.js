var CuteTool = require("./../tools.js");

function ApiGetContact(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var logger = tool.GetLogger();
        var response = tool.GetResponse();
        logger.debug("ApiGetContact.Service");

        var res = {

        };
        
        var cuteHttps = tool.GetHttps();
        function onResponse(data){
            logger.debug("ApiGetContact.OnHttps response.begin");
            //logger.debug(data.toString());
            var strJson = data.toString();
            logger.debug(strJson.length);
            var object = JSON.parse(data.toString());
            var starArray = [];//self.GetStar(data);

            /*
            for(var i = 0; i < starArray.length; i++){
                for(var j = 0; j < object.data.size; j++){
                    if(object.data.records[j].studentId == starArray[i]){
                        object.data.records[j].isStar = true;
                        break;
                    }
                }
            }*/

            var res = {contact:[{group:"star", member:[]},{member:[]}]};

            for(var i = 0; i < object.data.size; i++){
                if(object.data.records[i].isStar){
                    res.contact[0].member.push(object.data.records[i]);
                }else{
                    res.contact[1].member.push(object.data.records[i]);
                }
            }
            callback(response.Succ(res));
            logger.debug("ApiGetContact.OnHttps response.finished!");
        }
        var cuteConfig = tool.GetConfig();
        cuteHttps.Get(cuteConfig.GetStudentsInfoUrl() + "?pageSize=9999", onResponse);     
        logger.debug("ApiGetContact.end");
    }
    this.GetStar = function(data){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        var res = db.Query("select studentIds from star_table where ?", {uid:data.uid});
        return [41,42,9];
    }
    this.GetStudents = function(version, data, callback){
        
    }
}
/*
var obj = new ApiGetContact;
obj.Service("", {}, function(data){
    console.info(JSON.stringify(data));
});
*/
module.exports = ApiGetContact;