var CuteTool = require("./tools.js");

var tools = new CuteTool;
var https = tools.GetHttps();
var data = '{"access_token":"14_2koe6IcJu2h9Vkphc8aptL7tCHpq9zyDJ0P0LL7FTlw-eHEd4h_Svyr4VcTu8n9UTz1COHJqiJSgyMnC3PYEJ96bIUw_onkyaJNd-Y0lkORTkxw1gKMuJLqcFqlnRzLtHVPTO68zX_f331VGHMRiABAXCH","touser":"of1uW5BQnZHkG7aX3dU1Ah8viPlg","template_id":"5RrP5MixecP2lFPLATMazPRoQmBsiQ_wVy2a5H0Vd34","form_id":"16d321381a31df0b1a2737dfb8b325b3","page":"pages/index/index?new_message=true","data":{"keyword1":{"value":"新消息提醒"}}}';

https.Post(
    "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=14_2koe6IcJu2h9Vkphc8aptL7tCHpq9zyDJ0P0LL7FTlw-eHEd4h_Svyr4VcTu8n9UTz1COHJqiJSgyMnC3PYEJ96bIUw_onkyaJNd-Y0lkORTkxw1gKMuJLqcFqlnRzLtHVPTO68zX_f331VGHMRiABAXCH", 
    JSON.parse(data), 
    function(e){
    console.info(e);
})