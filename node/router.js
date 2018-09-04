
function CuteRouter(){    
    var version;
    var apiFunction;
    this.IsVaild = function(path){
        path = path.substr(1, path.length);
        var arr = path.split("/");
        if(arr.length < 3){
            return false;
        }
        this.apiFunction = arr[2];
        this.version = arr[1];
        return true;
    }
    this.Service = function(data, callback){
        var baseApi = {};
        switch(this.apiFunction){            
            case "login":
                var ApiLogin = require("./apis/api_login.js");
                baseApi = new ApiLogin;
                break;
            case "get_contact":
                var ApiGetContact = require("./apis/api_get_contact.js");
                baseApi = new ApiGetContact;
                break;
            case "get_profile":
                var ApiGetProfile = require("./apis/api_get_profile.js");
                baseApi = new ApiGetProfile;
                break;
            case "get_growth_records":
                var ApiGetGrowthRecords = require("./apis/api_get_growth_records.js");
                baseApi = new ApiGetGrowthRecords;
                break;
            case "get_growth_record":
                var ApiGetGrowthRecord = require("./apis/api_get_growth_record.js");
                baseApi = new ApiGetGrowthRecord;
                break;
            case "get_child_growth_record_count":
                var ApiGetChildGrowthRecordCount = require("./apis/api_get_child_growth_record_count.js");
                baseApi = new ApiGetChildGrowthRecordCount;
                break;
            case "get_new_message_count":
                var ApiGetNewMessageCount = require("./apis/api_get_new_message_count.js");
                baseApi = new ApiGetNewMessageCount;
                break;                
            case "get_new_message":
                var ApiGetNewMessage = require("./apis/api_get_new_message.js");
                baseApi = new ApiGetNewMessage;
                break;
            case "put_new_record":
                var ApiPutNewRecord = require("./apis/api_put_new_record.js");
                baseApi = new ApiPutNewRecord;
                break;
            case "put_member_fav":
                var ApiPutMemberFav = require("./apis/api_put_member_fav.js");
                baseApi = new ApiPutMemberFav;
                break;
            default:
                return this.BadApi();
                break;
        }
        return baseApi.Service(this.version, data, callback);
    }
    this.BadApi = function(){
        return (new require("./response.js")).BadApi();
    }
}

module.exports = CuteRouter;