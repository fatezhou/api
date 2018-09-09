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
    var connection;
    var conn;
    var isConnect = false;
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
                if (error) throw error;
                callback(results);                
            });
        }catch(err){
            callback({error:"sql error"});
        }
        connection.end();
        this.isConnect = false;
    }
    this.Connect = function(){
        this.Init();
    }
	this.Init(conn);
}

module.exports = CuteDbController;