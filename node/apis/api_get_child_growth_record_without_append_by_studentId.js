var CuteTools = require("./../tools.js");

function ApiGetChildGrowthRecordWithoutAppendByStudentId(){
    this.Service = function(version, data, callback){
        var tool = new CuteTools;
        var db = tool.GetDataBase();
        var response = tool.GetResponse();

        var sqlFmt = "select \
        id as recordId, author_id as authorId, author_type as authorType \
        text, picture_urls as pictureUrls from growth_record ??";
        var sqlParam = {
            student_id : data.studentId,
            record_type : 1
        };

        if(data.authorId && data.authorType){
            sqlParam.author_id = data.authorId;
            sqlParam.authorType = data.authorType;
        }

        db.Query(sqlFmt, sqlParam, function(e){
            if(e.error){
                callback(response.BadSQL());
            }else{
                for(var i in e){
                    e[i].pictureUrls = JSON.parse(e[i].pictureUrls).urls;
                }

                callback({records: e});
            }
        })
    }
}

module.exports = ApiGetChildGrowthRecordWithoutAppendByStudentId;

