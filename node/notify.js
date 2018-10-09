var CuteTool = require("./tools.js")
var tools = new CuteTool;
var db = tools.GetDataBase();
var mongo = tools.GetMongo();
var config = tools.GetConfig();
var template_id = config.GetTemplateId();
var template_id_parent = config.GetTemplateIdOfParent();
var wx_template_url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=";
var wx_t_sec = "";
var wx_p_sec = "";
var app_t_id = "";
var app_p_id = "";

/**
 * {"access_token": "14_KydXr0Afo8naESYBjHwkw_Qr0KlwoGRU1RB1j08Sr5ZEi4JjC41znvzI0Pam70E0H6z59WEaQl9UQEDeybCH41fQqmfDNxzMjpBA4zoLhkQcVmS-yeVZrQy05ecpbkbvEo-O66SGnclJf0ZHGGWcACAPPF",
"touser": "of1uW5BQnZHkG7aX3dU1Ah8viPlg",
"template_id": "5RrP5MixecP2lFPLATMazPRoQmBsiQ_wVy2a5H0Vd34",
"form_id": "a68ac70781cd59f46f09af497f6bcb13",
"page": "pages/index/newMess",
"data":{
               "keyword1":{"value":"新消息提醒"}
       }
}
 * 
 */

function PostMsgToWxClient(data){
    function GetToken(){
        var https = tools.GetHttps();
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=";        
        var templateId = "";        
        if(data.authorType == 1){
            url += app_t_id;
            url += "&secret=";
            url += wx_t_sec;
            templateId = template_id;
        }else if(data.authorType == 2){
            url += app_p_id;            
            url += "&secret=";
            url += wx_p_sec;
            templateId = template_id_parent;
        }else{
            console.info("error authorType, pass this one");
            return;
        }
        https.Get(url, function(e){            
            e = JSON.parse(e);
            console.info("get token end:  ", e);
            if(e.access_token){
                data.token = e.access_token;
                var httpsPost = tools.GetHttps();
                var url = wx_template_url + data.token;
                httpsPost.Post(
                    (url),
                    {
                        access_token: data.token,
                        touser: data.openId,
                        template_id: templateId,
                        form_id: data.formId,
                        page: "pages/index/index?new_message=true",
                        data:{
                            keyword1 : {value : "新消息提醒"}
                        }
                    }, 
                    function(res){   
                        console.info("push post end", res);                        
                        var sqlFmt = "delete from form_table where id = ?";
                        var deleteDb = tools.GetDataBase();
                        deleteDb.Query(sqlFmt, [data.id], function(e){
                            console.info("remove one used form_id");
                        });

                        var updateDb = tools.GetDataBase();
                        updateDb.Query("update new_message set state = 1 where org_author_id = ? and org_author_type = ?", 
                        [data.authorId, data.authorType], function(e){
                            console.info(e);
                        });
                    }
                );
            }
        })
    }
    GetToken();
}


function DoNotify(obj){    
    console.info("do notify:", obj);
    var newDb = tools.GetDataBase();
    newDb.Query("select * from form_table where author_id=? and author_type=? and !(form_id like '%the%') order by create_time desc limit 1", [obj.org_author_id, obj.org_author_type], function(e){
        if(!e.error){
            //send notify!
            console.info("notify callback, e:", e);
            try{
                e = JSON.stringify(e);
                e = JSON.parse(e);
            }
            catch(err){
                e = [];
            }

            if(e && e.length > 0){
                PostMsgToWxClient(
                    {
                        formId: e[0].form_id, 
                        openId: e[0].open_id, 
                        id:e[0].id, 
                        authorId: obj.org_author_id,
                        authorType: obj.org_author_type
                    });
            }
        }
    });
}


function CheckClientOnlineOrNot(obj){
    var author = {author_id:obj.org_author_id, author_type: obj.org_author_type};
    mongo.Query(author, function(e){
        if(e.length > 0){
            if(e[0].online){
               return;
            }
        }
        DoNotify(obj);
    })
}

function GetNewMessageFromDb(){
    var sqlFmt = "select DISTINCT org_author_id, org_author_type from new_message where state = 0";
    db.Query(sqlFmt, [], function(e){        
        if(!e.error){
            try{
                e = JSON.stringify(e);
                e = JSON.parse(e);
            }catch(err){
                e = [];
            }
            console.info("get distinct ok, size:", e.length);
            console.info(e);
            for(var i in e){
                CheckClientOnlineOrNot(e[i]);
            }
        }
    });
}

function GetAppSecFromDb(){
    var db = tools.GetDataBase();
    db.Query("select * from config_table", [], function(e){
        if(!e.error){
            try{
                app_t_id = config.GetTeacherAppid();
                app_p_id = config.GetParentAppid();
                e = JSON.stringify(e);
                e = JSON.parse(e);
                if(e.length > 0){
                    for(var i in e){
                        if(e[i].config_key == "app_t_sec"){
                            wx_t_sec = e[i].config_value;
                        }
                        if(e[i].config_key == "app_p_sec"){
                            wx_p_sec = e[i].config_value;
                        }
                    }
                    console.info("update the app_sec, " , wx_t_sec, wx_p_sec);
                    GetNewMessageFromDb();
                }                
            }
            catch(err){

            }
        }
    })
}

function mainLoop(){
    GetAppSecFromDb();
    setInterval(function(){
        GetAppSecFromDb();       
    }, 60000);
}

mainLoop();

var http = require("http");
var port = 20000;
if(process.argv.length > 2){
    port = parseInt(process.argv[2]);
}
http.createServer(function(req, res){
    res.writeHead(503, {'Content-Type': 'text/html; charset=utf8'});
    res.write("do not touch me, meow!!!");
    res.end();
}).listen(port);