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
                    var newDb = tool.GetDataBase();
                    newDb.Query("delete from new_message where org_author_id=? and org_author_type=?", [data.authorId, data.authorType], function(e){

                    });
                    callback(response.Succ(res));
                }
            });
        }

        function V2(){
            function GetRecord(){
                var sqlFmt = 
                    "select \
                    student_id as studentId,\
                    author_id as authorId,\
                    author_type as authorType,\
                    create_time as dateTime, \
                    text, \
                    parent_record_id as parentRecordId, \
                    id as recordId, \
                    picture_urls as pictureUrls, \
                    org_author_id as orgAuthorId, \
                    org_author_type as orgAuthorType,\
                    create_time as createTime\
                    from growth_record \
                    where record_type = 1 and id in(\
                    select record_id from new_message\
                    where org_author_id = ? and\
                    org_author_type = ? and\
                    msg_type = 3)\
                    ";
                    var recordDb = tool.GetDataBase();
                    recordDb.Query(sqlFmt, [data.authorId, data.authorType], function(e){
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
                            res.record = e;
                            GetNewAppend();
                        }
                    })
            }

            function GetNewAppend(){
                var sqlFmt =
                    "select \
                    student_id as studentId,\
                    author_id as authorId,\
                    author_type as authorType,\
                    create_time as dateTime, \
                    text, \
                    parent_record_id as parentRecordId, \
                    id as recordId, \
                    picture_urls as pictureUrls, \
                    org_author_id as orgAuthorId, \
                    org_author_type as orgAuthorType,\
                    create_time as createTime\
                    from growth_record\
                    where record_type = 2 and \
                    id in (\
                    select \
                    record_id \
                    from \
                    new_message \
                    where \
                    org_author_id=? \
                    and \
                    org_author_type=?\
                    and msg_type = 1\
                    ) ";

                    var appendDB = tool.GetDataBase();
                    appendDB.Query(sqlFmt, [data.authorId, data.authorType], function(e){
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
                            var deleteDb = tool.GetDataBase();
                            deleteDb.Query("delete from new_message where org_author_id=? and org_author_type=?", [data.authorId, data.authorType], function(e){
                                
                            });
                            callback(response.Succ(res));
                        }
                    });
            };
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
                            and msg_type = 2\
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
                        GetRecord();                        
                    }
                });     
            }
            GetNewLike();
        }

        if(version.indexOf("v1.0") != -1){
            console.info("use v1");
            GetNewLike();
        }            
        else if(version.indexOf("v2.0") != -1){
            console.info("use v2");
            V2();
        }
    }
}

module.exports = ApiGetNewMessage;