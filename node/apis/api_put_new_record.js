var CuteTool = require("./../tools.js");

function ApiPutNewRecord(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var logger = tools.GetLogger(); 
        var response = tools.GetResponse();
        logger.debug("ApiPutNewRecord.begin");
        function MakeToDataFmt(data){                        
            var sqlData = {};
            sqlData.text = data.text;
            sqlData.author_id = data.authorId;
            sqlData.picture_urls = JSON.stringify({urls:data.pictureUrls});
            sqlData.author_type = data.authorType;
            if(data.studentId)
                sqlData.student_id = data.studentId;
            sqlData.record_type = data.recordType;
            if(data.parentRecordId)
                sqlData.parent_record_id = data.parentRecordId;      
            return sqlData;
        }

        function WriteToDataBase(data, callback){
            logger.debug("WriteToDataBase.begin");
            var sqlData = MakeToDataFmt(data);
            logger.debug(sqlData);
            var result = {code:0, data:{}};
            if(data.recordType == 1){//日志
                if(true){
                    var familyIds = "[]";
                    if(data.familyIds){
                        familyIds = JSON.stringify(data.familyIds);
                    }
                    db.Query(
                        "insert into growth_record (\
                            text, author_id, picture_urls, \
                            author_type, student_id, record_type, \
                            parent_record_id, org_author_id, org_author_type, \
                            family_id, publish_state, main_teacher_id,\
                            asisst_id, family_ids\
                        )VALUES(\
                            ?,?,?,\
                            ?,?,?,\
                            ?,?,?,\
                            ?,?,?,\
                            ?,?)",
                        [
                            sqlData.text, 
                            data.isAssist ? data.mainTeacherId : data.authorId,
                            sqlData.picture_urls, 
                            sqlData.author_type, sqlData.student_id, 1, 
                            0, data.isAssist ? data.mainTeacherId : data.authorId, sqlData.author_type, 
                            data.familyId ? data.familyId : 0, 
                            data.publishNow ? 1 : 0, 
                            data.isAssist ? data.mainTeacherId : data.authorId,
                            data.isAssist ? data.authorId : 0, familyIds
                        ], function(res){
                            logger.debug("ApiPutNewRecord.finish");
                            if(res.error){
                                callback(response.BadSQL());
                            }else{
                                if(data.familyIds && data.publishNow){
                                    var dbFamilyIdsInsert = tools.GetDataBase();
                                    var insertNewMsgSql = "insert into new_message(\
                                        record_id, author_id, author_type,\
                                        msg_type, parent_record_id, org_author_id, \
                                        org_author_type, state)values";
                                    for(var i in data.familyIds){
                                        insertNewMsgSql += "(" + res.insertId + "," +
                                            data.authorId + "," + data.authorType + "," +
                                            3 + "," + 0 + "," + data.familyIds[i] + "," +
                                            2 + "," + 0 + "),";
                                    }
                                    if(insertNewMsgSql.length > 0){
                                        if(insertNewMsgSql.charAt(insertNewMsgSql.length - 1) == ','){
                                            insertNewMsgSql = insertNewMsgSql.substr(0, insertNewMsgSql.length - 1);
                                        }
                                    }
                                    dbFamilyIdsInsert.Query(insertNewMsgSql, [], function(e){
                                        console.info("insert to new_message");
                                    });
                                }
                                if(data.isAssist){
                                    var dbNotifyMainTeacher = tools.GetDataBase();
                                    var insertSql = "insert into new_message(\
                                        record_id, author_id, author_type,\
                                        msg_type, parent_record_id, org_author_id,\
                                        org_author_type, state)values(\
                                            ?, ?, ?,\
                                            ?, ?, ?,\
                                            ?, ?)";
                                        dbNotifyMainTeacher.Query(insertSql, 
                                            [
                                                res.insertId, data.authorId, data.authorType,
                                                3, 0, data.mainTeacherId, 
                                                1, 0 
                                            ], function(err){});
                                }
                                callback(response.Succ({recordId:res.insertId}));                        
                            }                        
                        });
                }
            }else if(data.recordType == 2){//评论
                db.Query(
                    "insert into growth_record(\
                        text, author_id, author_type, \
                        student_id, record_type, parent_record_id,\
                        org_author_id, org_author_type, picture_urls, family_id\
                    )VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [sqlData.text, sqlData.author_id, sqlData.author_type, sqlData.student_id, 2, sqlData.parent_record_id, data.orgAuthorId, data.orgAuthorType, sqlData.picture_urls, data.familyId ? data.familyId : 0], function(e){
                        logger.debug("ApiPutNewRecord.finish");
                        if(e.error){
                            callback(response.BadSQL());
                        }else{
                            callback(response.Succ({put_new_record:e.insertId}));
                        }
                });                
            }else{
                callback(response.Succ({put_new_record: "type error"}));
            }           
        }  
        WriteToDataBase(data, callback);        
        logger.debug("ApiPutNewRecord.end");
    }
}

module.exports = ApiPutNewRecord;