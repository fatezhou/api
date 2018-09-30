var CuteTool = require("./tools.js")
var tools = new CuteTool;
var db = tools.GetDataBase();
var mongo = tools.GetMongo();


function DoNotify(obj){
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
                var https = tools.GetHttps();
                https.Post(
                    url, 
                    {},
                    function(e){

                    }
                )
            }
        }
    })
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
    var sqlFmt = "select DISTINCT org_author_id, org_author_type from new_message";
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

}).listen(port);