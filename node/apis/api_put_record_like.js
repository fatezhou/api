var CuteTool = require("./../tools.js");

function ApiPutRecordLike(){
    this.Service = function(version, data, callbcak){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();
        var sqlFmt = "insert into growth_record_like (record_id, author_id, author_type, \
            parent_record_id, org_author_id, org_author_type)VALUES(?,?,?,?,?,?)";
        db.Query(sqlFmt, [data.recordId, data.authorId, data.authorType, data.parentRecordId, data.orgAuthorId, data.orgAuthorType], function(e){
            if(e.error){
                callback(response.BadSQL());
            }else{
                callback(response.Succ({text:"添加成功"}));
            }
        });
    }
}