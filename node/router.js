
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
            case "get_one_growth_record_with_append_by_recordId":
                var ApiGetOneGrowthRecordWithAppendByRecordId = require("./apis/api_get_one_growth_record_with_append.js");
                baseApi = new ApiGetOneGrowthRecordWithAppendByRecordId;
                break;
            case "get_growth_records_without_append":
                var ApiGetGrowthRecordWithoutAppend = require("./apis/api_get_growth_record_without_append.js");
                baseApi = new ApiGetGrowthRecordWithoutAppend;
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
            case "get_child_growth_records":
                var ApiGetChildGrowthRecordWithoutAppendByStudentId = require("./apis/api_get_child_growth_record_without_append_by_studentId.js");
                baseApi = new ApiGetChildGrowthRecordWithoutAppendByStudentId;
                break;
            case "get_child_growth_record_count":
                var ApiGetChildGrowthRecordCount = require("./apis/api_get_child_growth_record_count.js");
                baseApi = new ApiGetChildGrowthRecordCount;
                break;
            case "get_parent_info":
                var ApiGetParentInfo = require("./apis/api_get_parent_info.js");
                baseApi = new ApiGetParentInfo;
                break;
            default:
                return {code:4, data:{}, error:"api错误"};
        }
        return baseApi.Service(this.version, data, callback);
    }
}

module.exports = CuteRouter;