var CuteTool = require("./../tools.js");

function ApiReview(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();

        function DoReview(){
            if(!data.recordId || !data.authorId || !data.authorType){
                callback(response.BadParam());
            }else{
                var sqlFmt = "update growth_record set publish_state = 1 where id = ?";
                db.Query(sqlFmt, [data.recordId], function(e){
                    if(e.error){
                        callback(response.BadApi());
                    }else{
                        if(!data.familyIds){
                            data.familyIds = [];
                        }
                        var familyIds = data.familyIds;
                        var dbFamilyIdsInsert = tools.GetDataBase();
                        var insertNewMsgSql = "insert into new_message(\
                            record_id,\
                            author_id,\
                            author_type,\
                            msg_type, \
                            parent_record_id, \
                            org_author_id, \
                            org_author_type, \
                            state)values";
                        for(var i in familyIds){
                            insertNewMsgSql += "(" + res.recordId + "," +
                                data.authorId + "," + data.authorType + "," +
                                3 + "," + 0 + "," + familyIds[i] + "," +
                                2 + "," + 0 + "),";
                        }
                        if(data.assistId){
                            insertNewMsgSql += 
                                "(" + data.recordId + "," +
                                    data.assistId + "," + 1 + "," + 
                                    3 + "," + 0 + "," +  data.assistId + ", 1, 0)";
                        }
                        if(insertNewMsgSql.length > 0){
                            if(insertNewMsgSql.charAt(insertNewMsgSql.length - 1) == ','){
                                insertNewMsgSql = insertNewMsgSql.substr(0, insertNewMsgSql.length - 1);
                            }
                        }
                        dbFamilyIdsInsert.Query(insertNewMsgSql, [], function(e){
                            console.info("insert to new_message");
                        });
                        callback(response.Succ({text:"审核结束"}));
                    }
                })
            }
        }

        DoReview();
    }
}

module.exports = ApiReview;