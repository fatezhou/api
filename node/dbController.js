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
            console.info("database connect fail!-->" + e);
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
                connection.end();
                self.isConnect = false;
                if (error){
                    console.info(error);
                    callback({error:true});
                }else{
                    callback(results);                
                }
            });
        }catch(err){
            callback({error:true});
        }
        //connection.end();
    }
    this.Connect = function(){
        this.Init(this.conn);
    }
    this.Init(conn);
    console.info("database connect succ!");
}

module.exports = CuteDbController;