var CuteTool = require("./../tools.js")

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
                if(e.error){
                    callback(response.BadApi());
                }else{
                    if(e.count == 0){
                        mongo.Insert({authorId:data.authorId, authorType:data.authorType, state:"online"}, function(e){
                            if(e.error){
                                callback(response.BadApi());
                            }else{
                                callback(response.Succ({text:"insert ok"}));
                            }                            
                        });
                    }else{
                        callback(response.Succ({text:"update ok"}));
                    }
                }
            })
        }        
    }
}

module.exports = ApiHeartBeat;
