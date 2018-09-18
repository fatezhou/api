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
        var sqlFmt = "";
        if(data.cancel == false){
            sqlFmt = "insert into star_table(student_id, uid, utype)VALUES(?, ?, ?)";            
        }else{
            sqlFmt = "delete from star_table where student_id=? and uid=? and utype=?";
        }    
        var sqlParam = [data.studentId, data.authorId, data.authorType];
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