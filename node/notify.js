var CuteTool = require("./tools.js")
var tools = new CuteTool;
var db = tools.GetDataBase();
var mongo = tools.GetMongo();
var config = tools.GetConfig();
var template_id = config.GetTemplateId();
var app_id = "wxc3cdca6978c3b5ba";
var wx_template_url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=";
var wx_token = "";
var wx_secret = "eac688a46b0f56b4167f0fd71771fc67";

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
        url += app_id;
        url += "&secret=";
        url += wx_secret;        

        https.Get(url, function(e){
            if(e.access_token){
                data.token = e.access_token;
                var https = tools.GetHttps();
                https.Post(
                    wx_template_url + data.token,
                    {
                        access_token: data.token,
                        touser: data.openId,
                        template_id: template_id,
                        form_id: data.formId,
                        page: "pages/index/index",
                        data:{
                            keyword1 : {value : "新消息提醒"}
                        }
                    }, 
                    function(e){
                        console.info(e);
                    }
                )
            }
        })
    }
    GetToken();
}


function DoNotify(obj){
    var arrDeleteId = [];
    db.Query("select * from form_table where author_id=? and author_type=?", [obj.org_author_id, obj.org_author_type], function(e){
        if(!e.error){
            //send notify!
            try{
                e = JSON.stringify(e);
                e = JSON.parse(e);
            }
            catch(err){
                e = [];
            }
            for(var i in e){
                PostMsgToWxClient({formId: e[i].form_id, openId: e[i].openId});
                arrDeleteId.push(e[i].id);
            }
        }
    });
    var sqlFmt = "delete from form_table where id";
    var ids = "";
    for(var i in arrDeleteId){
        ids += arrDeleteId[i] + ",";
    }
    ids += "0";
    sqlFmt += "(" + ids + ")";
    db.Query(sqlFmt, [], function(e){
        console.info("remove form id");
    });
}


function CheckClientOnlineOrNot(obj){
    var author = {author_id:obj.org_author_id, author_type: obj.org_author_type};
    mongo.Query(author, function(e){
        if(e.length > 0){
            if(e[0].online){
                //do nothing
            }else{
                DoNotify(obj);
            }
        }
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

            }
            for(var i in e){
                CheckClientOnlineOrNot(e[i]);
            }
        }
    });
}

function mainLoop(){
    setInterval(function(){
        GetNewMessageFromDb();
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