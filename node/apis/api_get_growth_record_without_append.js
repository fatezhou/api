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
        var logger = tools.GetLogger();
        var res = {};
        var likeCount = 0;
        var tableMainRecord = [];

        logger.debug("ApiGetGrowthRecordWithoutAppend.begin");

        function GetGrowthRecordHeader(){
			logger.debug(data);
            var sqlFmt = "select text, author_id as authorId, \
            id as recordId, student_id as studentId, \
            picture_urls as pictures, author_type as authorType, create_time as dateTime, \
            family_ids as familyIds, assist_id as assistId, main_teacher_id as mainTeacherId , \
            publish_state as publishState \
            from \
            growth_record where record_type = 1 ";

            var sqlCountFmt = "select count(*) as size from growth_record where record_type = 1 ";

            var sqlData = {};
            var sql = [];
            var sqlCount = [];
			if(data.studentId){
				sql.push(data.studentId);				
                sqlFmt += "and student_id = ? "
                sqlCountFmt += "and student_id = ? ";
                sqlCount.push(data.studentId);
			}
            
            if(data.recordId){
                sqlFmt += "and id < ? ";
                sqlCountFmt += "and id < ? ";
                sql.push(data.recordId);
                sqlCount.push(data.recordId);
            }

            if(!data.pageSize){
                data.pageSize = 10;
            }

            
            if(data.authorId && data.authorType && (data.isAssist == false || !data.isAssist)){
                sqlFmt += "and author_id = ? and author_type = ? ";
                sql.push(data.authorId);
                sql.push(data.authorType);

                sqlCountFmt += " and author_id = ? and author_type = ? ";
                sqlCount.push(data.authorId);
                sqlCount.push(data.authorType);
            }    
            
            if(data.authorId && data.authorType && data.isAssist){
                sqlFmt += "and assist_id = ? and author_type = ? ";
                sql.push(data.authorId);
                sql.push(data.authorType);

                sqlCountFmt += " and assist_id = ? and author_type = ? ";
                sqlCount.push(data.authorId);
                sqlCount.push(data.authorType);
            }

            if(data.authorType == 1){
                sqlFmt += "and publish_state != 2 ";
                sqlCountFmt += "and publish_state != 2 ";
            }else{
                sqlFmt += "and publish_state = 1 ";
                sqlCountFmt += "and publish_state = 1 ";
            }
            
            sqlFmt += "order by create_time desc limit " + data.pageSize;            

            db.Query(sqlCountFmt, sqlCount, function(eCount){
                console.info(eCount);
                eCount = JSON.stringify(eCount);
                eCount = JSON.parse(eCount);

                var res = {};
                res.size = eCount[0].size;

                db.Query(sqlFmt, sql, function(e){
                    console.info(e);
                    if(e.error){
                        callback(response.BadSQL());
                    }else{
                        e = JSON.stringify(e);
                        e = JSON.parse(e);
                        
                        
                        for(var i in e){
                            try{
                                e[i].pictureUrls = JSON.parse(e[i].pictures).urls;	
                            }catch(err){							
                                e[i].pictureUrls = [];
                            }                        
                            delete e[i]["pictrues"];
                        }
    
                        callback(response.Succ({records:e, size: eCount[0].size}));
                    }
                })
            })


            
        }    

        GetGrowthRecordHeader();
    }
}

module.exports = ApiGetGrowthRecordWithoutAppend;