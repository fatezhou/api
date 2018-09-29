var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017";

function Mongo(){    
    var dbconnector = null;
    this.Query = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }
        if(!table){
            table = "clientState";
        }

        function doQuery(db){
            var dbo = db.db("bz");   
            dbo.collection(table).find(obj).toArray(function(err, result){
                if(err){
                    callback({error:true, msg:"find error"});
                }else{
                    db.close();
                    callback(result);
                }
            });
        }

        if(dbconnector){
            doQuery(dbconnector);
        }else{
            MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
                dbconnector = db;
                if(err){
                    callback({error:true, msg:"connect error"});
                }else{
                    doQuery(db);
                }
            })
        }
        
    };

    this.Insert = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }

        if(!table){
            table = "clientState";
        }

        function doInsert(db){
            var dbo = db.db("bz");
            dbo.collection(table).insertOne(obj, function(err, res){
                if(err){
                    callback({error:true, msg:err});
                }else{
                    //db.close();
                    callback({error:false, msg:"ok"});                        
                }
            })
        }
        
        if(!dbconnector){
            MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
                dbconnector = db;
                if(err){
                    callback({error:true, msg:err});
                }else{
                    doInsert(dbconnector);
                }
            })
        }else{
            doInsert(dbconnector);
        }

        
    };

    this.Update = function(conditionObj, commitObj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }

        if(!table){
            table = "clientState";
        }

        function doUpdate(db){
            var dbo = db.db("bz");
            console.info(mongoUrl, table);
            dbo.collection(table).updateMany(conditionObj, {$set: commitObj}, function(err, res){
                if(err){
                    callback({error:true, count:0, msg:err});
                }else{
                    db.close();
                    callback({error:false, count:res.result});                        
                }
            })
        }

        if(dbconnector){
            doUpdate(dbconnector);
        }else{
            MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){
                if(err){
                    callback({error:true, msg:err});
                }else{
                    dbconnector = db;
                    doUpdate(db);
                }
            })
        }        
    };

    this.Delete = function(obj, callback, mongoUrl, table){
        if(!mongoUrl){
            mongoUrl = url;
        }
        
        if(!table){
            table = "clientState";
        }

        function doDelete(db){
            var dbo = db.db("bz");
            dbo.collection(table).deleteMany(obj, function(err, res){
                if(err){
                    callback({error:true, msg:err});                        
                }else{
                    db.close();
                    callback({error: false, msg:res.result.n});
                }
            })
        }

        if(dbconnector){
            doDelete(dbconnector);
        }else{
            MongoClient.connect(mongoUrl, {useNewUrlParser:true}, function(err, db){            
                if(err){
                    callback({error:true, msg:err});
                }else{
                    dbconnector = db;
                    doDelete(db);
                }
            });
        }        
    };

    this.Close = function(){
        if(dbconnector){
            db.close();
        }
    }
}

var mgdb = new Mongo;
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})
mgdb.Insert({id:1, state:"online"}, function(e){
    console.info(e);
})

// // mgdb.Query({id:1}, function(e){
// //     console.info(e);
// // })

// mgdb.Update({id:1}, {$set:{state:"online", text:"e"}}, function(e){
//     console.info(e);
// });

// mgdb.Delete({id:1}, function(e){
//     console.info(e);
// })

module.exports = Mongo;