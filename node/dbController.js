var mysql = require('mysql');


/*
var conn = {
  host     : 'localhost',
  user     : 'minidope',
  password : 'minidope',
  database : 'minidope'
};
*/

function CuteDbController(conn){
    this.connection;
    this.conn = conn;
    this.isConnect = false;
    this.Init = function(conn){
        this.conn = conn;
        this.connection = mysql.createConnection(conn);
        this.connection.connect(function(e){
            if(e)
                console.info("database connect-->" + e);            
        });
        this.isConnect = true;
    }
    this.Query = function(sqlfmt, data, callback){
        if(this.isConnect == false){
            this.Connect();
        }
        var connection = this.connection;        
        var self = this;
        try{
            connection.query(sqlfmt, data, function (error, results) {                
                connection.end(function(endErr){
                    if(endErr)
                        console.info("con.end:", endErr);
                    else
                        console.info("con.end.ok");
                });
                self.isConnect = false;
                if (error){
                    console.info(error);
                    callback({error:true});
                }else{
                    callback(results);                
                }
            });
        }catch(err){
            connection.end(function(endErr){
                if(endErr)
                    console.info("con.end:", endErr);
                else
                    console.info("con.end.ok");
            });
            self.isConnect = false;
            callback({error:true});
        }
        //connection.end();
    }
    this.Connect = function(){
        this.Init(this.conn);
    }
    this.Init(conn);
}

module.exports = CuteDbController;