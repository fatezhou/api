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
      
          },
          method: "POST"
        })
      }
    },
    complete:function(res){
     
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
  wx.request({
    // 获取
    url: app.globalData.minodopeApi.getParentInfo,
    method: 'POST',
    data: {
      unionid: app.globalData.unionid,
      openid: app.globalData.openid,
      authorType: 2
    },
    success: function(res) {
console.info(res)
      if (res.data.code === 0) {
        // 家长信息保存本地
        if (res.data.data.profile) {
          app.globalData.parentInfo = res.data.data.profile
          app.globalData.userId = res.data.data.profile.id
          app.globalData.studentList = res.data.data.profile.students
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
      "studentId": studentId,
    },
    header: {},
    method: 'post',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.data.data.records.length != 0) {

        app.globalData.allGrowthRecords = res.data.data.records
 
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = " ";
          res.data.data.records[i].avatarUrl = " ";
          res.data.data.records[i].text = decodeURIComponent(res.data.data.records[i].text)

          res.data.data.records[i].isfold = true
          if (res.data.data.records[i].text.length > 100) {
            res.data.data.records[i].showTextBtn = true
          }
        }
        // 分布加载第一式
        app.globalData.recordsList = res.data.data.records
        app.globalData.indexSize = res.data.data.size
       
        return callback(0)
      } else {
        return callback(1)
      }


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
};

// 获取所有家长 
function getParents(callback) {
  wx.request({
    url: app.globalData.minodopeApi.getParentsInfo,
    method: 'POST',
    data: {
      unionid: app.globalData.unionid,
      openid: app.globalData.openid,
    },
    success: function (res) {
      console.info(res)
      console.info('getParents')

      if (res.data.code == 0) {
        // 所有家长信息保存本地
        if (res.data.data.records) {
          app.globalData.allParentInfo = res.data.data.records
        }
      }
      return callback(0)
    },
  })
};


module.exports = {
  login: login,
  getHeadImg: getHeadImg,
  getParentInfo: getParentInfo,
  getGrowthRecordsWithoutAppend: getGrowthRecordsWithoutAppend,
  getTeachers: getTeachers,
  getParents: getParents,

}