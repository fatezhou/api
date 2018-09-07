var CuteTool = require("./../tools.js");

function ApiGetNewMessageCount(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var db = tool.GetDataBase();
        var response = tool.GetResponse();
        var res = db.Query("");

        function ToSQL(data){
            var sql = {};
            sql.member_id = data.memberId;
        }

        var sqlData = ToSQL(data);

        db.Query("select count(*) as msgSize from new_message where ??", data, function(res){
            if(res.error){
                callback(response.BadSQL());
            }else{
                callback(response.Succ({count:res[0].msgSize}));
            }
        })
    }
}

module.exports = ApiGetNewMessageCount;