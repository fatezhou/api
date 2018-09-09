/*
CREATE TABLE `growth_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text CHARACTER SET utf8,
  `picture_urls` text CHARACTER SET utf8,
  `author_id` varchar(32) NOT NULL,
  `author_type` int(2) NOT NULL DEFAULT '1' COMMENT '1:teacher,2:parent',
  `student_id` varchar(32) NOT NULL,
  `append_advice` text CHARACTER SET utf8,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `some_one_like` text CHARACTER SET utf8 COMMENT '{"myLike":true, "like":[memberids]}',
  `record_type` int(2) NOT NULL DEFAULT '1' COMMENT '1: text, 2: append',
  `parent_record_id` int(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) 
*/
var CuteTool = require("../tools.js");

function ApiGetGrowthRecordWithoutAppend(){
    this.Service = function(version, data, callback){
        //"growthRecordId":"10001"
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();
        var res = {};
        var likeCount = 0;
        var tableMainRecord = [];

        function GetGrowthRecordHeader(){
            var sqlFmt = "select text, author_id \
            as authorId, id as recordId, student_id as studentId, \
            picture_urls as pictures, author_type as authorType create_time as dateTime from \
            growth_record ?? order by create_time desc";
            var sqlData = {};
            sqlData.student_id = data.studentId;
            if(data.authorId){
                sqlData.author_id = data.authorId;
            }

            db.Query(sqlFmt, sqlData, function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    for(var i in e){
                        e[i].pictureUrls = JSON.parse(e[i].pictures).urls;
                        delete e[i]["pictrues"];
                    }

                    callback(response.Succ({records:e}));
                }
            })
        }    

        GetGrowthRecordHeader();
    }
}

module.exports = ApiGetGrowthRecordWithoutAppend;