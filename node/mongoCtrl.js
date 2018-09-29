var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017";

function Mongo(){    
    this.Query = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }
        MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
            if(err){
                callback({error:true, msg:"connect error"});
            }else{
                var dbo = db.db("bz");   
                if(!table){
                    table = "clientState";
                }
                dbo.collection(table).find(obj).toArray(function(err, result){
                    if(err){
                        callback({error:true, msg:"find error"});
                    }else{
                        db.close();
                        callback(result);
                    }
                });
            }
        })
    };

    this.Insert = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }

        MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
            if(err){
                callback({error:true, msg:err});
            }else{
                var dbo = db.db("bz");
                if(!table){
                    table = "clientState";
                }
                dbo.collection(table).insertOne(obj, function(err, res){
                    if(err){
                        callback({error:true, msg:err});
                    }else{
                        db.close();
                        callback({error:false, msg:"ok"});                        
                    }
                })
            }
        })
    };

    this.Update = function(conditionObj, commitObj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }

        MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
            if(err){
                callback({error:true, msg:err});
            }else{
                var dbo = db.db("bz");
                if(!table){
                    table = "clientState";
                }
                dbo.collection(table).updateMany(conditionObj, commitObj, function(err, res){
                    if(err){
                        callback({error:true, msg:err});
                    }else{
                        db.close();
                        callback({error:false, count:res.result.nModified});                        
                    }
                })
            }
        })
    };

    this.Delete = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }
        MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
            if(err){
                callback({error:true, msg:err});
            }else{
                var dbo = db.db("bz");
                if(!table){
                    table = "clientState";
                }
                dbo.collection(table).deleteMany(obj, function(err, res){
                    if(err){
                        callback({error:true, msg:err});                        
                    }else{
                        db.close();
                        callback({error: false, msg:res.result.n});
                    }
                })
            }
        });
    }
}

var mgdb = new Mongo;
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})

// mgdb.Query({id:1}, function(e){
//     console.info(e);
// })

mgdb.Update({id:1}, {$set:{state:"online", text:"e"}}, function(e){
    console.info(e);
});

// mgdb.Delete({id:1}, function(e){
//     console.info(e);
// })

module.exports = Mongo;