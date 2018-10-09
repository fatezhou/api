var CuteTool = require("../tools.js");

function ApiPutFormId(){
    var tool = new CuteTool;
    var db = tool.GetDataBase();
    var logger = tool.GetLogger();
    var response = tool.GetResponse();
    this.Service = function(version, data, callback){
        var sqlFmt = "insert into form_table (author_id, author_type, form_id, open_id, union_id, token)VALUES(?, ?, ?, ?, ?, ?)";
        if(!data.authorId || !data.authorType || !data.formId || !data.openId || !data.unionId || !data.accesstoken){
            callback(response.BadParam());
        }else{
            if(data.formId.indexOf("the ") != -1){
                callback(response.BadParam());
                return;
            }
            db.Query(sqlFmt, [data.authorId, data.authorType, data.formId, data.openId, data.unionId, data.accesstoken], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    try{
                        e = JSON.stringify(e);
                        e = JSON.parse(e);
                    }catch(err){
                        e = [];
                    }
                    callback(response.Succ({text:"OK"}));
                }
            })
        }
    }
}

module.exports = ApiPutFormId;