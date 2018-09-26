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

            return callback(0)
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

function getHeadImg(callback) {
  wx.getImageInfo({
    src: app.globalData.headImg,
    success: function(res) {
      app.globalData.Imgpath = res.path
      return callback(res.path)
    }
  })
}

function getParentInfo(callback) {
  // 通过uid获取教师信息  改为获取家长信息
  wx.request({
    // 改为获取家长info
    url: app.globalData.minodopeApi.getParentInfo,
    method: 'POST',
    data: {
      unionid: app.globalData.unionid,
      openid: app.globalData.openid,
    },
    success: function(res) {
      console.info(res)
      console.info('getParentInfo')

      if (res.data.code === 0) {
        // 家长信息保存本地
        if (res.data.data.teacherInfo.teacherId) {
          app.globalData.teacherInfo = res.data.data.teacherInfo
          app.globalData.userId = res.data.data.teacherInfo.teacherId
        } else {
          wx.redirectTo({
            url: '../unBound/index',
          })
        }
      }

      return callback(0)

    },
  })
};

function getGrowthRecordsWithoutAppend(studentId, callback) {
  wx.request({
    url: app.globalData.minodopeApi.getGrowthRecordsWithoutAppend,
    data: {
      "unionid": app.globalData.unionid,
      "openid": app.globalData.openid,
      // "authorId": app.globalData.userId,
      // "authorType": app.globalData.userType,
      // 目前写死的
      "studentId": studentId,
    },
    header: {},
    method: 'post',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.info(res)
      console.info('getGrowthRecordsWithoutAppend')
      app.globalData.allGrowthRecords = res.data.data.records
      // console.log(app.globalData.allGrowthRecords)
      for (var i in res.data.data.records) {
        res.data.data.records[i].name = " ";
        res.data.data.records[i].avatarUrl = " ";
      }
      // 分布加载第一式
      app.globalData.recordsList = res.data.data.records
      app.globalData.indexSize = res.data.data.size

      return callback(0)

    },
    fail: function(res) {},
    complete: function(res) {},
  })
};

function getTeachers(callback) {
  wx.request({
    url: app.globalData.minodopeApi.getTeachers,
    data: {
      "pages": 100
    },
    method: 'POST',
    dataType: 'json',
    success: function(res) {
      var contact = res.data.data.teachers;
      console.info(contact)
      console.info('getTeachers')
      // 获取所有教师信息
      app.globalData.allTeacherInfo = contact
      for (var i in contact) {
        for (var j in app.globalData.recordsList) {
          if (contact[i].teacherId == app.globalData.recordsList[j].authorId) {
            app.globalData.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
            app.globalData.recordsList[j].avatarUrl = contact[i].avatarUrl
          }
        }
      }

      return callback(app.globalData.recordsList)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports = {
  login: login,
  getHeadImg: getHeadImg,
  getParentInfo: getParentInfo,
  getGrowthRecordsWithoutAppend: getGrowthRecordsWithoutAppend,
  getTeachers: getTeachers,
}