var CuteTool = require("./../tools.js");

function ApiReview(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();

        function DoReview(){
            if(!data.recordId){
                callback(response.BadParam());
            }else{
                var sqlFmt = "update growth_record set state = 1 where id = ?";
                db.Query(sqlFmt, [data.recordId], function(e){
                    if(e.error){
                        callback(response.BadApi());
                    }else{
                        sqlFmt = "select family_ids, assist_id from growth_record where id = ?";
                        var selectDb = tools.GetDataBase();
                        selectDb.Query(sqlFmt, [data.recordId], function(selectE){
                            if(selectE.error){
                                callback(response.BadSQL());
                            }else{
                                try{
                                    selectE = JSON.stringify(selectE);
                                    selectE = JSON.parse(selectE);
                                    var familyIds = selectE.family_ids;
                                    var dbFamilyIdsInsert = tools.GetDataBase();
                                    var insertNewMsgSql = "insert into new_message(\
                                        record_id, author_id, author_type,\
                                        msg_type, parent_record_id, org_author_id, \
                                        org_author_type, state)values";
                                    for(var i in familyIds){
                                        insertNewMsgSql += "(" + res.recordId + "," +
                                            data.authorId + "," + data.authorType + "," +
                                            3 + "," + 0 + "," + familyIds[i] + "," +
                                            2 + "," + 0 + "),";
                                    }
                                    insertNewMsgSql += "(" + res.recordId + "," +
                                        selectE.assist_id + "," + data.authorType + "," + 
                                        3 + "," + 0 + "," +  selectE.assist_id + "," + 1 + ")";
                                    // if(insertNewMsgSql.length > 0){
                                    //     if(insertNewMsgSql.charAt(insertNewMsgSql.length - 1) == ','){
                                    //         insertNewMsgSql = insertNewMsgSql.substr(0, insertNewMsgSql.length - 1);
                                    //     }
                                    // }
                                    dbFamilyIdsInsert.Query(insertNewMsgSql, [], function(e){
                                        console.info("insert to new_message");
                                    });
                                    callback(response.Succ({}));
                                }
                                catch(err){
                                    callback(response.BadApi());
                                }
                                
                            }
                        })


                        callback(response.Succ({}));
                    }
                })
            }
        }

        DoReview();
    }
}

module.exports = ApiReview;