var CuteTool = require("./../tools.js")

console.info(new Date().getTime());
function ApiHeartBeat(){
    var tools = new CuteTool;
    var mongo = tools.GetMongo();
    var response = tools.GetResponse();
    this.Service = function(version, data, callback){
        if(!data.authorId || !data.authorType){
            callback(response.BadApi());
        }else{
            mongo.Update(
                {authorId:data.authorId, authorType:data.authorType}, 
                {authorId:data.authorId, authorType:data.authorType, state:"online"}, function(e){
                    console.info(e);
                if(e.error){
                    callback(response.BadApi());
                }else{
                    if(e.count.n == 0){
                        mongo.Insert({authorId:data.authorId, authorType:data.authorType, state:"online"}, function(e){
                            if(e.error){
                                callback(response.BadApi());
                            }else{
                                console.info(new Date().getTime());
                                callback(response.Succ({text:"insert ok"}));
                            }                            
                        });
                    }else{
                        console.info(new Date().getTime());
                        callback(response.Succ({text:"update ok"}));
                    }
                }
            })
        }        
    }
}

module.exports = ApiHeartBeat;

var api = new ApiHeartBeat;
api.Service(1, {authorId:22, authorType:2}, function(e){
    console.info(e);
})
