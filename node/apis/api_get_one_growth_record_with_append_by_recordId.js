var CuteTool = require("../tools.js");

function ApiGetOneGrowthRecordWithAppendByRecordId(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();
        var logger = tools.GetLogger();
        var res = {record:{append:[]}};
        var recordId_in = "";
        var headerLike = 0;

        function GetMainTextLike(){
            logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetMainTextLike.begin");
            var sqlFmt = "select count(id) as someOneLike from growth_record_like where record_id=?";
            db.Query(sqlFmt, [data.recordId], function(e){
                logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetMainTextLike.finish");
                if(e.error){
                    callback(response.BadSQL());
                }else{					
                    headerLike = e[0].someOneLike;
                    GetText();
                }
            })
        };

        function GetText(){
            logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetText.begin");
            var sqlFmt = "select \
            text, id as recordId, author_id as authorId, \
            author_type as authorType, student_id as studentId, picture_urls as pictures, create_time as dateTime,\
            false as ILike\
             from growth_record where id=? or parent_record_id=? order by create_time";
            db.Query(sqlFmt, [data.recordId, data.recordId], function(e){                
                logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetText.finish");
				logger.debug(e);
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    e = JSON.stringify(e);
                    e = JSON.parse(e);					
                    e[0].like = headerLike;
                    res.record = e[0];
                    delete res.record["ILike"];
                    res.record.append = [];										
                    for(var i = e.length - 1; i > 0; i--){
                        recordId_in += e[i].recordId;
                        recordId_in += ",";
                        console.info(e[i]);
                        try{
                            e[i].pictures = JSON.parse(e[i].pictures).urls;
                        }catch(err){
                            e[i].pictures = [];
                        }
						res.record["append"].push(e[i]);
                    }					
                    recordId_in = recordId_in.substr(0, recordId_in.length - 1);
                    GetAppendTextILike();
                }               
            });
        }
        
        function GetAppendTextILike(){            
            logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetAppendTextILike.begin");
            var sqlFmt = "select record_id from growth_record_like where author_id = ? and author_type = ? and record_id in (?)";
            db.Query(sqlFmt, [data.authorId, data.authorType, recordId_in], function(e){
                logger.debug("ApiGetOneGrowthRecordWithAppendByRecordId.GetAppendTextILike.finish");
                if(e.error){
                    callback(response.BadSQL());
					return;
                }				
				console.info(e);
				e = JSON.stringify(e);
				e = JSON.parse(e);	
                for(var i in e){
                    for(var j in res.record.append){
                        if(e[i].record_id == res.record.append[j].recordId){
                            res.record.append[j].like = true;
                            break;
                        }
                    }
                }
                callback(response.Succ(res));
            });
        }
        GetMainTextLike();
    }
}

module.exports = ApiGetOneGrowthRecordWithAppendByRecordId;