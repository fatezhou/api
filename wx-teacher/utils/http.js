const app = getApp();

// 获取openId unionId token等
function login(callback) {
  wx.login({
    success: function(res) {
      if (res.code) {
        wx.request({
          url: app.globalData.minidopeApi.loginUrl,
          data: {
            code: res.code,
            appid: app.globalData.appId
          },
          method: "POST",
          success: function(res) {
            if (res.data.data.openId) {
              app.globalData.openId = res.data.data.openId;
            }
            if (res.data.data.unionId) {
              app.globalData.unionId = res.data.data.unionId;
            }
            if (res.data.data.token) {
              app.globalData.token = res.data.data.token;
            }
            return callback(0)
          }
        })
      }
    }
  })
};

function getDefaultAvatar(callback) {
  // 获取默认头像
  wx.getImageInfo({
    src: app.globalData.minidopeApi.defaultAvatarUrl,
    success: function(res) {
      app.globalData.defaultAvatar = res.path
      return callback(0)
    }
  })
};

// 获取教师个人信息
function getTeacherInfo(callback) {
  if (!app.globalData.userInfo) {
    wx.request({
      url: app.globalData.minidopeApi.getTeacherInfo,
      data: {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code === 0) {
          if (res.data.data.teacherInfo.teacherId) {
            app.globalData.userInfo = res.data.data.teacherInfo
            app.globalData.userId = res.data.data.teacherInfo.teacherId
            return callback(0)
          } else {
            wx.redirectTo({
              url: '../unBound/index',
            })
          }
        }
      },
    })
  }
};

// 获取记录 无评论 有recordId则获取recordId前面的记录 否则获取最新的10条记录
function getGrowthRecordsWithoutAppend(recordId, studentId, pageSize, callback) {
  var data = {}
  if (studentId == 0) {
    // 教师记录
    data = {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      recordId: recordId,
      authorId: app.globalData.userId,
      authorType: app.globalData.userType,
      pageSize: pageSize,
    }
  } else {
    // 时间线
    data = {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      recordId: recordId,
      studentId: studentId,
      pageSize: pageSize,
    }
  }
  wx.request({
    url: app.globalData.minidopeApi.getGrowthRecordsWithoutAppend,
    data: data,
    method: 'POST',
    success: function(res) {
      if (res.data.code == 0) {
        for (var i in res.data.data.records) {
          res.data.data.records[i].text = decodeURIComponent(res.data.data.records[i].text)
          res.data.data.records[i].isfold = true
          if (res.data.data.records[i].text.length > 100) {
            res.data.data.records[i].showTextBtn = true
          }
        }
        return callback(res.data.data)
      }
    }
  })
};

// 根据记录id 获取对应的评论
function getoneGrowthRecordWithAppend(recordId, callback) {
  wx.request({
    url: app.globalData.minidopeApi.oneGrowthRecordWithAppendUrl,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      recordId: recordId
    },
    method: 'POST',
    success: function(res) {
      if (res.data.code == 0) {
        res.data.data.record.text = decodeURIComponent(res.data.data.record.text)
        for (var i in res.data.data.record.append) {
          res.data.data.record.append[i].text = decodeURIComponent(res.data.data.record.append[i].text)
        }
        return callback(res.data.data.record)
      }
    }
  })

};

// 点赞
function putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, cancel, callback) {
  wx.request({
    url: app.globalData.minidopeApi.putRecordLike,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openid,
      authorId: app.globalData.userId, //自己的id
      authorType: app.globalData.userType, //1: teacher, 2: parent",
      recordId: recordId, //点赞评论的id   如果给记录点赞 则parentRecordId为0
      parentRecordId: parentRecordId, //点赞记录的id
      orgAuthorId: orgAuthorId, //评论的作者id
      orgAuthorType: orgAuthorType, //评论的作者类型
      cancel: cancel, //点赞的添加与取消
    },
    method: 'POST',
    success: function(res) {
      return callback(res.data.code)
    }
  })
};

// 设置星标
function putMemberFav(studentId, cancel, callback) {
  wx.request({
    url: app.globalData.minidopeApi.putMemberFav,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      authorType: app.globalData.userType,
      authorId: app.globalData.userId,
      studentId: studentId,
      cancel: cancel
    },
    method: 'post',
    success: function(res) {
      return callback(0)
    },
  })
};

// 获取成长记录条数
function getRecordSize(studentId, callback) {
  wx.request({
    url: app.globalData.minidopeApi.getChildGrowthRecordCount,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      // "authorId": app.globalData.userId,
      authorType: app.globalData.userType, //1: teacher, 2: parent",
      studentId: studentId
    },
    method: "post",
    success: function(res) {
      if (res.data.code == 0) {
        return callback(res.data.data.count)
      }
    }
  })
};

// 获取学生 家长 教师列表
function getStudents(callback) {
  wx.request({
    url: app.globalData.minidopeApi.getStudents,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      authorId: app.globalData.userId, //可选, 只要特定老师的通讯录 含星标
      authorType: app.globalData.userType, //保留参数, 用来标记是老师还是家长
    },
    method: 'POST',
    success: function(res) {
      if (res.data.code == 0) {
        for (var i in res.data.data.contact) {
          if (res.data.data.contact[i].group == "star") {
            // 有星标的
            app.globalData.starList = res.data.data.contact[i].member
          } else if (res.data.data.contact[i].group == "normal") {
            // 通讯录
            app.globalData.studentList = res.data.data.contact[i].member
          }
        }
        return callback(0)
      }
    }
  })
};

function getTeachers(callback) {
  wx.request({
    url: app.globalData.minidopeApi.getTeachers,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      pages: 100
    },
    method: 'POST',
    success: function(res) {
      if (res.data.code == 0) {
        app.globalData.teacherList = res.data.data.teachers
        return callback(0)
      }
    }
  })
};

function getParents() {
  wx.request({
    url: app.globalData.minidopeApi.getParents,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
    },
    method: 'POST',
    success: function(res) {
      app.globalData.parentList = res.data.data.records
    }
  })
};

function getFamily(studentId, callback) {
  wx.request({
    url: app.globalData.minidopeApi.getFamily,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      studentId: studentId,
    },
    method: 'POST',
    success: function(res) {
      return callback(res.data.data.parents)
    },
  })
}

module.exports = {
  login: login,
  getDefaultAvatar: getDefaultAvatar,
  getTeacherInfo: getTeacherInfo,

  getGrowthRecordsWithoutAppend: getGrowthRecordsWithoutAppend,
  getoneGrowthRecordWithAppend: getoneGrowthRecordWithAppend,
  putRecordLike: putRecordLike,
  putMemberFav: putMemberFav,
  getRecordSize: getRecordSize,

  getStudents: getStudents,
  getTeachers: getTeachers,
  getParents: getParents,
  getFamily: getFamily,
}