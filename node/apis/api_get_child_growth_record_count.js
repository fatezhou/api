function ApiGetChildGrowthRecordCount(){
    this.Service = function(version, data, callback){        
        var CuteTools = require("./../tools.js");
        var tool = new CuteTools;
        var db = tool.GetDataBase();
        
        var sqlData = {};
        sqlData.student_id = data.studentId;
        var appendOption = "1 = 1";
        if(data.author_id && data.author_type){
            appendOption = "author_id = " + data.author_id + " and author_type=" + data.author_type;
        }
        var sqlFmt = "select count(*) as recordSize from growth_record where student_id=? and ? ";
        db.Query(sqlFmt, [data.studentId, appendOption], function(e){
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