var CuteTool = require("./../tools.js");

function ApiGetNewMessageCount(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var db = tool.GetDataBase();
        var response = tool.GetResponse();
        var sqlData = {};
        sqlData.org_author_id = data.authorId;
        sqlData.org_author_type = data.authorType;

        db.Query("select count(*) as msgSize from new_message where org_author_id=? and org_author_type=?", [data.authorId, data.authorType], function(res){
            if(res.error){
                callback(response.BadSQL());
            }else{
                callback(response.Succ({count:res[0].msgSize}));
            }
        });
    }
}

module.exports = ApiGetNewMessageCount;