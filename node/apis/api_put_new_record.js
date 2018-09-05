function ApiPutNewRecord(){
    this.Service = function(version, data, callback){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;

        function MakeToDataFmt(data){
            var sqlData = {};
            sqlData.text = data.text;
            sqlData.author_id = data.authorId;
            sqlData.picture_urls = JSON.stringify({urls:data.pictureUrls});
            sqlData.author_type = data.authorType;
            sqlData.student_id = data.studentId;
            sqlData.record_type = data.recordType;
            sqlData.append_advice = JSON.stringify({append:[]});
            sqlData.parent_record_id = data.parentRecordId;
        }

        function WriteToDataBase(data, callback){
            var sqlData = MakeToDataFmt(data);
            var result = {code:0, data:{}};
            if(data.recordType == 0){//首条日志
                db.Query(
                    "insert into growth_record (text, author_id, picture_urls, author_type, student_id, record_type, append_advice, parent_record_id)VALUES(?,?,?,?,?,?,?,?)",
                    [sqlData.text, sqlData.author_id, sqlData.picture_urls, sqlData.author_type, sqlData.student_id,
                    1, sqlData.append_advice, 0], function(res){
                        result.data.put_new_record.recordId = res.insertId;
                        callback(result);                        
                    })    
            }else if(data.recordType == 1){//评论或点赞
                
            }            
        }  
    }
}

module.exports = ApiPutNewRecord;