var CuteTool = require("./../tools.js");

function ApiGetNewMessage(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var db = tool.GetDataBase();
        var response = tool.GetResponse();
        var res = {};

        function GetNewLike(){
            var sqlFmt = "select  a.student_id as studentId, \
            a.id as recordId, \
            a.text, \
            a.picture_urls as pictureUrls, \
            a.create_time as dateTime , \
            a.author_id, \
            a.author_type, \
            a.parent_record_id as parentRecordId\
            from \
            growth_record a, \
            growth_record_like b \
            where \
            a.id = b.record_id \
            and \
            a.record_type = 2 \
            and \
            a.id in (\
            select \
            record_id \
            from \
            new_message \
            where \
            org_author_id=? \
            and \
            org_author_type=?\
            ) ";

            db.Query(sqlFmt, [data.authorId, data.authorType], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{                    
                    try{
                        e = JSON.stringify(e);
                        e = JSON.parse(e);
                    }catch(err){
                        e = [];
                    }
                    for(var i in e){
                        try{
                            e[i].pictureUrls = JSON.parse(e[i].pictureUrls).urls;
                        }catch(err){
                            e[i].pictureUrls = [];
                        }  
                    }
                    res.like = e;
                    GetNewAppend();
                }
            });
        }

        function GetNewAppend(){
            var sqlFmt = "select \
            a.student_id as studentId, \
            a.author_id as authorId, \
            a.author_type as authorType, \
            a.create_time as dateTime, \
            a.text, \
            a.parent_record_id as parentRecordId, \
            a.id as recordId, \
            b.text as parentText, \
            b.picture_urls as pictureUrls\
            from \
            growth_record a , \
            growth_record b \
            where \
            a.record_type = 1 and \
            a.parent_record_id = b.id \
            and \
            a.id in (\
            select \
            record_id \
            from \
            new_message \
            where \
            org_author_id=? and org_author_type=?\
            )";

            db.Query(sqlFmt, [data.authorId, data.authorType], function(e){
                if(e.error){
                    callback(response.BadSQL());
                }else{
                    try{
                        e = JSON.stringify(e);
                        e = JSON.parse(e);
                    }catch(err){
                        e = [];
                    }
                    for(var i in e){
                        try{
                            e[i].pictureUrls = JSON.parse(e[i].pictureUrls).urls;
                        }catch(err){
                            e[i].pictureUrls = [];
                        }                        
                    }
                    res.append = e;
                    db.Query("delete from new_message where org_author_id=? and org_author_type=?", [data.authorId, data.authorType], function(e){

                    });
                    callback(response.Succ(res));
                }
            });
        }

        GetNewLike();
    }
}

module.exports = ApiGetNewMessage;