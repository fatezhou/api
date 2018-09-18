var CuteTool = require("./../tools.js");

function ApiGetContact(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var logger = tool.GetLogger();
        var response = tool.GetResponse();
        var db = tool.GetDataBase();        
        var cuteConfig = tool.GetConfig();
        logger.debug("ApiGetContact.Service");

        var cuteHttps = tool.GetHttps();
        
        function GetStar(){
            db.Query("select student_id from star_table where uid=? and utype=?", [data.authorId, data.authorType], function(e){
                console.info(e);
                try{
                    e = JSON.stringify(e);
                    e = JSON.parse(e);
                }catch(err){
                    e = [];
                }
                var starArray = e;
                cuteHttps.Get(cuteConfig.GetStudentsInfoUrl() + "?pageSize=9999", function(data){
                    logger.debug("ApiGetContact.OnHttps response.begin");
                    var strJson = data.toString();
                    logger.debug(strJson.length);
                    var object = JSON.parse(data.toString());
        
                    for(var i in starArray){
                        for(var j in object.data.records){
                            if(starArray[i].student_id == object.data.records[j].studentId){
                                object.data.records[j].isStar = true;
                            }
                        }
                    }

                    /*
                    for(var i = 0; i < starArray.length; i++){
                        for(var j = 0; j < object.data.size; j++){
                            if(object.data.records[j].studentId == starArray[i]){
                                object.data.records[j].isStar = true;
                                break;
                            }
                        }
                    }*/
        
                    var res = {contact:[{group:"star", member:[]},{group:"normal", member:[]}]};
        
                    for(var i = 0; i < object.data.size; i++){
                        if(object.data.records[i].isStar){
                            res.contact[0].member.push(object.data.records[i]);
                        }
                        res.contact[1].member.push(object.data.records[i]);
                    }
                    callback(response.Succ(res));
                    logger.debug("ApiGetContact.OnHttps response.finished!");
                });     
                logger.debug("ApiGetContact.end");
            });
        }
        GetStar();
    }
}
/*
var obj = new ApiGetContact;
obj.Service("", {}, function(data){
    console.info(JSON.stringify(data));
});
*/
module.exports = ApiGetContact;