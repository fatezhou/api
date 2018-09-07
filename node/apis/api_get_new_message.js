var CuteTool = require("./../tools.js");

function ApiGetNewMessage(){
    this.Service = function(version, data, callback){
        var tool = new CuteTool;
        var db = tool.GetDataBase();

        function ToSQL(data){
            var sql = {};
            sql.author_id = data.memberId;
            return sql;
        }

        var sqlData = ToSQL(data);
        function QueryLike(){
            var res = db.Query(
                "select "
            )
        }
        function QueryAppend(){
            var res = db.Query(
                "select A.text,  from growth_record A, new_message B where A.id = B.record_id and ??", 
                sqlData, function(e){
                    if(e.error){
    
                    }else{
                        QueryLike();
                    }
                });
        }


        
         
    }
}

module.exports = ApiGetNewMessage;