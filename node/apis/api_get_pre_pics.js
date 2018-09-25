var CuteTool = require("../tools.js");

function ApiGetPrePics(){
    var tools = new CuteTool;
    var db = tools.GetDataBase();
    var response = tools.GetResponse();
    this.Service = function(version, data, callback){
        var sqlFmt = "select id as recordId, picture_urls as picture \
        from growth_record where CHAR_LENGTH(picture_urls) > 20 \
        and student_id = ? and record_type = 1 order by id desc limit 3";

        if(!data.studentId){
            callback(response.Succ({records:[]}));
        }else{
            db.Query(sqlFmt, [data.studentId], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    try{
                        e = JSON.stringify(e);
                        e = JSON.parse(e);
                    }
                    catch(err){
                        e = [];
                    }
                    for(var i in e){
                        e[i].picture = JSON.parse(e[i].picture).urls;
                    }
                    callback(response.Succ({records: e}));
                }
            })
        }        
    }
}

module.exports = ApiGetPrePics;