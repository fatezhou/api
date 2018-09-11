var CuteTools = require("./../tools.js");

function ApiGetChildGrowthRecordWithoutAppendByStudentId(){
    this.Service = function(version, data, callback){
        var tool = new CuteTools;
        var db = tool.GetDataBase();
        var response = tool.GetResponse();

        var sqlFmt = "select \
        id as recordId, author_id as authorId, author_type as authorType, \
        text, picture_urls as pictureUrls, create_time as dateTime from growth_record where student_id=? and ? order by create_time desc";
        var sqlParam = {
            student_id : data.studentId,
            record_type : 1
        };
        var appendOption = "1 = 1";
        if(data.authorId && data.authorType){
            sqlParam.author_id = data.authorId;
            sqlParam.authorType = data.authorType;
            appendOption = "author_id=" + data.authorId + " and author_type=" + data.authorType
        }

        db.Query(sqlFmt, [data.studentId, appendOption], function(e){
            if(e.error){
                callback(response.BadSQL());
            }else{
                for(var i in e){
                    e[i].pictureUrls = JSON.parse(e[i].pictureUrls).urls;
                }
                e = JSON.stringify(e);
                e = JSON.parse(e);
                callback({records: e});
            }
        })
    }
}

module.exports = ApiGetChildGrowthRecordWithoutAppendByStudentId;

