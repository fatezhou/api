function ApiGetContact(){
    this.Service = function(version, data, callback){
        //var CuteDbController = require("./../dbController.js");
        //var db = new CuteDbController;
        //var res = db.Query("");
        var res = {

        }
        this.GetStudents(version, data, callback);
        if(res.code == 0){
            return {code:0, data:{contact:res.dataArray}};
        }else{
            return {code:res.code, data:{}};
        }     
    }
    this.GetStar = function(){
        //var CuteDbController = require("./../dbController.js");
        //var db = new CuteDbController;
        //var res = db.Query("select studentId from star_table where ?", {uid:1});
        return [41,42,9];
    }
    this.GetStudents = function(version, data, callback){
        var CuteHttps = require("./../https.js");
        var cuteHttps = new CuteHttps;
        var self = this;
        function onResponse(data){
            var object = JSON.parse(data.toString());
            var starArray = self.GetStar();
            var resObject= {code:0};
            for(var i = 0; i < starArray.length; i++){
                for(var j = 0; j < object.data.size; j++){
                    if(object.data.records[j].studentId == starArray[i]){
                        object.data.records[j].isStar = true;
                        break;
                    }
                }
            }

            var res = {code:0, data:{contact:[{group:"star", member:[]},{member:[]}]}};

            for(var i = 0; i < object.data.size; i++){
                if(object.data.records[i].isStar){
                    res.data.contact[0].member.push(object.data.records[i]);
                }else{
                    res.data.contact[1].member.push(object.data.records[i]);
                }
            }
            callback(res);
        }
        cuteHttps.Get("https://ouat.buzaishudian.com/test/api/students?pageSize=9999", onResponse);        
    }
}
/*
var obj = new ApiGetContact;
obj.Service("", {}, function(data){
    console.info(JSON.stringify(data));
});
*/
module.exports = ApiGetContact;