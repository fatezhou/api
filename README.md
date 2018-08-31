# response中的code错误码, 如果错误的话, 在response中的data将为空
0 : 成功
1 : 权限不足
2 : 错误的会员id

----------------------------------------------
# 拉取通讯录
##url: http://ip:port/api/v1.0/get_contact
##method: post
##param: 
##{
##	"openid": "xxxxxxxxxxx"
##}
##response:
##{
##    "code": 0,
##    "data": {
##        "contact": [
##            {
##                "group": "family",
##                "member": [
##                    {
##                        "name": "Jack",
##                        "age": 10,
##                        "nickName": "Jakkie",
##                        "memberId": "1001"
##                    }
##                ]
##            },
##            {
##                "group": "other",
##                "member": [
##                    {
##                        "name": "Chris",
##                        "age": 50,
##                        "nickName": null,
##                        "memberId": "1002"
##                    }
##                ]
##            }
##        ]
##    }
##}
##other situation:
##code: 0/1

---------------------------------------------
# 获取会员资料明细
url: http://ip:port/api/v1.0/get_profile
method: post
param: 
{
	"openid": "xxxxxxxxxxx",
	"memberId": "1003"
}
response:
{
    "code": 0,
    "data": {
        "profile": {
            "name": "李茶德",
            "sexual": "male/famale",
            "idCardNumber": "05920001",
            "nickName": "小李",
            "birthday": "2012-05-05",
            "memberStatus": "年费会员",
            "expiryDate": "2020-10-10",
            "growthRecords":533,
            "isStaff": false
        }
    }
}
other situation:
code: 0/1/2

---------------------------------------------
# 获取批量会员成长记录
url: http://ip:port/api/v1.0/get_growth_records
method: post
param: 
{
	"openid": "xxxxxxxxxxx",
	"beginRecodId": "150",//从第几张开始加载
	"range": 30
}
response:
{
    "code": 0,
    "data": {
        "records": [
            {
                "recordId": "10003",
                "sevenCowKey": "guid",
                "text": "这是一段文字",
                "authorId": "05920001(这个对应会员或老师id)"
            },
            {
                "recordId": "10005",
                "sevenCowKey": "guid",
                "text": "这是另一段文字",
                "authorId": "05920001(这个对应会员或老师id)"
            }
        ]
    }
}
other situation:
code: 0/1

---------------------------------------------
# 获取批量会员成长记录