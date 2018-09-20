function ApiGetChildGrowthRecordCount(){
    this.Service = function(version, data, callback){        
        var CuteTools = require("./../tools.js");
        var tool = new CuteTools;
        var db = tool.GetDataBase();        
        
        var sql = [];        
        var sqlFmt = "select count(*) as recordSize from growth_record where true ";//
        if(data.studentId){
            sqlFmt += " and student_id = ? ";
            sql.push(data.studentId);
        }

        if(data.authorId && data.authorType){
            sqlFmt += " and author_id=? and author_type=? ";
            sql.push(data.authorId);
            sql.push(data.authorType);
        }

        db.Query(sqlFmt, sql, function(e){
            var res = tool.GetResponse();
            if(e.error){
                callback(res.BadSQL());
            }else{
                callback(res.Succ({count:e[0].recordSize}));
            }
        })
    }
}

module.exports = ApiGetChildGrowthRecordCount;