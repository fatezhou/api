var CuteTool = require("./../tools.js");

function ApiPutRecordFav(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var config = tools.GetConfig();
        var response = tools.GetResponse();
        db.Init(config.GetDataBaseConfig());

        function toSQLObject(data){
            var sql = {};
            sql.record_id = data.recordId;
            sql.member_id = data.memberId;
            sql.member_type = data.type;
            return sql;
        }

        var sqlData = toSQLObject(data);
        db.Query(
            "insert into growth_record_like (record_id, member_id, member_type)VALUES(?, ?, ?)", 
            [sql.record_id, sql.member_id, sql.member_type], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    callback(response.Succ({text:"set fav succ!"}));
                }
            });
    }
}