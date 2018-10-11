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
                db.Query(
                    "insert into growth_record (\
                        text, author_id, picture_urls, \
                        author_type, student_id, record_type, \
                        parent_record_id, org_author_id, org_author_type, family_id\
                    )VALUES(?,?,?,?,?,?,?,?,?,?)",
                    [sqlData.text, sqlData.author_id, sqlData.picture_urls, sqlData.author_type, sqlData.student_id,
                    1, 0, sqlData.author_id, sqlData.author_type, data.familyId ? data.familyId : 0], function(res){
                        logger.debug("ApiPutNewRecord.finish");
                        if(res.error){
                            callback(response.BadSQL());
                        }else{
                            callback(response.Succ({recordId:res.insertId}));                        
                        }                        
                    })    
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