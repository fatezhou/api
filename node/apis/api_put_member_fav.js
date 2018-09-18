var CuteTool = require("./../tools.js");

function ApiPutMemberFav(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var config = tools.GetConfig();
        var response = tools.GetResponse();
        var logger = tools.GetLogger();

        logger.debug("ApiPutMemberFav");
        logger.debug(data);

        var sqlFmt = "insert into star_table(student_id, uid, utype)VALUES(?, ?, ?)";
        var sqlParam = [data.studentId, data.uid, data.utype];
        db.Query(sqlFmt, sqlParam, function(e){
            if(e.error){
                callback(response.BadSQL());
            }else{
                callback(response.Succ({res:"ok"}));
            }
        })
        
    }
}

module.exports = ApiPutMemberFav;