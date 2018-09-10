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
        this.connection.connect();
        this.isConnect = true;
    }
    this.Query = function(sqlfmt, data, callback){
        if(this.isConnect == false){
            this.Connect();
        }
        var connection = this.connection;        
        try{
            connection.query(sqlfmt, data, function (error, results) {
                console.info("query.finish");
                if (error) 
                    throw error;
                callback(results);                
            });
        }catch(err){
            callback({error:true});
        }
        connection.end();
        this.isConnect = false;
    }
    this.Connect = function(){
        this.Init(this.conn);
    }
    this.Init(conn);
    console.info("database connect succ!");
}

module.exports = CuteDbController;