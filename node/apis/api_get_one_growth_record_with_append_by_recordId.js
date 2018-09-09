var CuteTool = require("../tools.js");

function ApiGetOneGrowthRecordWithAppendByRecordId(){
    this.Service = function(version, data, callback){
        var tools = new CuteTool;
        var db = tools.GetDataBase();
        var response = tools.GetResponse();
        var res = {record:{append:[]}};
        var recordId_in = "";
        var headerLike = 0;

        function GetMainTextLike(){
            var sqlFmt = "select count(id) as like from growth_record_like ??";
            db.Query(sqlFmt, {id:data.recordId}, function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    headerLike = e.like;
                    GetText();
                }
            })
        };

        function GetText(){
            var sqlFmt = "select text, id as recordId, author_id as authorId, author_type as authorType, student_id as studentId, creaet_time as dateTime\
            false as ILike\
             from growth_record where id=? or parent_record_id=? order by create_time desc";
            db.Query(sqlFmt, [data.recordId, data.recordId], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }

                res.record = e[0];
                res.record.like = headerLike;
                delete res.record["ILike"];
                res.record.append = [];

                for(var i in e){
                    recordId_in += e[i].id;
                    recordId_in += ",";
                }
                res.record.append = e;
                recordId_in = recordId_in.substr(0, recordId_in.length - 1);
                GetAppendTextILike();
            });
        }
        
        function GetAppendTextILike(){
            var sqlFmt = "select record_id from growth_record_like where author_id = ? and author_type = ? and record_id in (?)";
            db.Query(sqlFmt, [data.authorId, data.authorType, recordId_in], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }
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