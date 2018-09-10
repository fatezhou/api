function ApiGetChildGrowthRecordCount(){
    this.Service = function(version, data, callback){        
        var CuteTools = require("./../tools.js");
        var tool = new CuteTools;
        var db = tool.GetDataBase();
        
        var sqlData = {};
        sqlData.student_id = data.studentId;
        var sqlFmt = "select count(*) as recordSize from growth_record ??";
        db.Query(sqlFmt, sqlData, function(e){
            var res = tool.GetResponse();
            if(e.error){
                callback(res.BadSQL());
            }else{
                callback(res.Succ({count:res.recordSize}));
            }
        })
    }
}

module.exports = ApiGetChildGrowthRecordCount;