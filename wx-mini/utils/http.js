const app = getApp();

function login(callback) {
  wx.login({
    success: function(res) {
      if (res.code) {

        wx.request({
          url: app.globalData.minodopeApi.loginUrl,
          data: {
            code: res.code,
            appid: app.globalData.appId
          },
          success: function(e) {
            console.info("app.js.login");
            console.info(e.data.data);
            if (e.data.data.openId) {
              app.globalData.openid = e.data.data.openId;
            }
            if (e.data.data.unionId) {
              app.globalData.unionid = e.data.data.unionId;
            }
            if (e.data.data.token) {
              app.globalData.token = e.data.data.token;
            }

            // 通过uid获取教师信息
            wx.request({
              url: app.globalData.getTeacherInfo,
              method: 'POST',
              data: {
                unionid: app.globalData.unionid,
                openid: app.globalData.openid,
              },
              success: function(res) {
                console.info(res)

                if (res.data.code === 0) {
                  if (res.data.data.teacherInfo.teacherId) {
                    app.globalData.teacherInfo = res.data.data.teacherInfo
                    app.globalData.userId = res.data.data.teacherInfo.teacherId
                  } else {
                    wx.redirectTo({
                      url: '../unBound/index',
                    })
                  }
                }
                wx.request({
                  url: app.globalData.getGrowthRecordsWithoutAppend,
                  data: {
                    "unionid": app.globalData.unionid,
                    "openid": app.globalData.openid,
                    "authorId": app.globalData.userId,
                    "authorType": app.globalData.userType,
                  },
                  header: {},
                  method: 'post',
                  dataType: 'json',
                  responseType: 'text',
                  success: function(res) {
                    console.info(res)
                   
                    app.globalData.allGrowthRecords = res.data.data.records
                    console.log(app.globalData.allGrowthRecords)
                    for (var i in res.data.data.records) {
                      res.data.data.records[i].name = " ";
                    }
                    // 分布加载第一式
                    app.globalData.recordsList = res.data.data.records
                    app.globalData.indexSize = res.data.data.size

                    wx.request({
                      url: app.globalData.minodopeApi.contactUrl,
                      data: {
                        unionid: app.globalData.unionid,
                        openid: app.globalData.openid,
                        authorId: app.globalData.userId, //可选, 只要特定老师发的
                        authorType: app.globalData.userType, //保留参数, 用来标记是老师还是家长
                      },
                      method: 'POST',
                      dataType: 'json',
                      success: function(res) {
                        // 有星标的
                        app.globalData.stararr = res.data.data.contact[0].member;
                        var contact = res.data.data.contact[1].member;
                        // 通讯录
                        app.globalData.allStudent = contact
                        for (var i in contact) {
                          for (var j in app.globalData.recordsList) {
                            if (contact[i].studentId == app.globalData.recordsList[j].studentId) {
                              app.globalData.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
                            }
                          }
                        }

                        app.globalData.contact = app.globalData.recordsList;
                        return callback(app.globalData.contact)

                      },
                      fail: function(res) {},
                      complete: function(res) {},
                    })



                  },
                  fail: function(res) {},
                  complete: function(res) {},
                })


              },
            })
          },
          fail: function(e) {
            console.info(e);
          },
          method: "POST"
        })
      }
    }
  })
};

module.exports = {
  login: login,
}