var mysql = require('mysql');


/*
var connectionz = {
  host     : 'localhost',
  user     : 'minidope',
  password : 'minidope',
  database : 'minidope'
};
*/

function CuteDbController(conn){
    var connection;
    this.Init = function(conn){
        this.connection = mysql.createConnection(conn);
        this.connection.connect();
    }
    this.Query = function(sqlfmt, data, callback){
        var connection = this.connection;        
        try{
            connection.query(sqlfmt, data, function (error, results) {
                if (error) throw error;
                callback(results);
                connection.end();
            });
        }catch(err){

        }
    }
	this.Init(conn);
}

module.exports = CuteDbController;