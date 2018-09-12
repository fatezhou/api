
var CuteTool = require("./tools.js");

function CuteRouter(){    
    var version;
    var apiFunction;
    var tool = new CuteTool;
    var logger = tool.GetLogger();
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
    this.Service = function(data, url, callback){
        logger.debug("CuteRouter.Service, url:%s", url, "apiFunction:" + this.apiFunction);
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
                var ApiGetOneGrowthRecordWithAppendByRecordId = require("./apis/api_get_one_growth_record_with_append_by_recordId.js");
                baseApi = new ApiGetOneGrowthRecordWithAppendByRecordId;
                break;
            case "get_growth_record_without_append":
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
            case "get_parents_info":
                var ApiGetParentInfo = require("./apis/api_get_parent_info.js");
                baseApi = new ApiGetParentInfo;
                break;
            case "put_record_like":
                var ApiPutRecordLike = require("./apis/api_put_record_like.js");
                baseApi = new ApiPutRecordLike;
                break;
            case "get_teacher_info":
                var ApiGetTeacherInfo = require("./apis/api_get_teacher_info.js");
                baseApi = new ApiGetTeacherInfo;
                break;
            case "get_teachers":
                var ApiGetTeachers = require("./apis/api_get_teachers.js");
                baseApi = new ApiGetTeachers;
                break;
            case "bindPhone":
                var ApiBindPhone = require("./apis/api_bind_phone.js");
                baseApi = new ApiBindPhone;
                break;
            case "unbindPhone":
                var ApiUnBindPhone = require("./apis/api_unbind_phone.js");
                baseApi = new ApiUnBindPhone;
                break;
            case "phone-vcode":
                var ApiPhoneVcode = require("./apis/api_phone_vcode.js");
                baseApi = new ApiPhoneVcode;
                break;                
            default:
                callback({code:4, data:{}, error:"api错误"});
                return;
        }
        logger.debug("start service");
        return baseApi.Service(this.version, data, callback);
    }
}

module.exports = CuteRouter;