function CuteResponse(){    
    var url;
    var postData;
    this.RecordErrorParam = function(url, postData){
        this.url = url;
        this.postData = postData;
        
    }
    this.BadApi = function(){
        return {code:4, data:{}, error:"api错误"};
    }
    this.BadPermission = function(){
        return {code:1, data:{}, error:"权限不足"};
    }
    this.BadMemberId = function(){
        return {code:2, data:{}, error:"会员id错误"};
    }
    this.BadGrowthRecord = function(){
        return {code:3, data:{}, error:"找不到成长记录"};
    }
    this.Succ = function(succData){
        return {code:0, data:succData, error:"成功"}
    }
}

module.exports = CuteResponse;