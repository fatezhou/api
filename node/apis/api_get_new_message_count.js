function ApiGetNewMessageCount(){
    this.Service = function(version, data, callback){
        var CuteDbController = require("./../dbController.js");
        var db = new CuteDbController;
        var res = db.Query("");

        function ToSQL(data){
            var sql = {};
            sql.member_id = data.memberId;
        }

        var sqlData = ToSQL(data);

        db.Query("select count(*) as msgSize from new_message where ??", data, function(res){
            if(res.error){
                callback();
            }else{
                {count:res[0].msgSize}
                callback();
            }
        })

    }
}

module.exports = ApiGetNewMessageCount;