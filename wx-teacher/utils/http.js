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
        console.info(res)
        if (res.data.code === 0) {
          if (res.data.data.teacherInfo.teacherId) {
            app.globalData.userInfo = res.data.data.teacherInfo
            app.globalData.userId = res.data.data.teacherInfo.teacherId
            app.globalData.role = res.data.data.teacherInfo.role
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
    if (app.globalData.role == 0) {
      // 教师记录
      data = {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
        recordId: recordId,
        authorId: app.globalData.userId,
        authorType: app.globalData.userType,
        pageSize: pageSize,
        isAssist: true, //用来标记是否为助教,
      }
    } else if (app.globalData.role == 2) {
      // 班主任记录
      data = {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
        recordId: recordId,
        authorId: app.globalData.userId,
        authorType: app.globalData.userType,
        pageSize: pageSize,
      }
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
  console.info(JSON.stringify(data))
  wx.request({
    url: app.globalData.minidopeApi.getGrowthRecordsWithoutAppend,
    data: data,
    method: 'POST',
    success: function(res) {
      console.info(res)
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
        res.data.data.record.isfold = true
        if (res.data.data.record.text.length > 100) {
          res.data.data.record.showTextBtn = true
        }

        for (var i in res.data.data.record.append) {
          res.data.data.record.append[i].text = decodeURIComponent(res.data.data.record.append[i].text)
        }
        return callback(res.data.data.record)
      }
    }
  })

};

// 获取新消息
function getNewMessage(callback) {
  wx.request({
    url: app.globalData.minidopeApi.getNewMessage,
    data: {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      authorId: app.globalData.userId, //自己的id
      authorType: app.globalData.userType //自己的type
    },
    method: 'POST',
    success: function(res) {
      console.info(res.data.data)
      for (var i = 0; i < res.data.data.append.length; i++) {
        res.data.data.append[i].text = decodeURIComponent(res.data.data.append[i].text)
      }
      return callback(res)
    }
  })
};

function review(recordId, familyIds, assistId, callback) {
  var data = {}
  if (assistId == 0) {
    // 发布自己的
    data = {
      openid: app.globalData.openId,
      unionid: app.globalData.unionId,
      authorId: app.globalData.userId,
      authorType: app.globalData.userType,
      recordId: recordId, //纪录的id
      familiIds: familyIds, //其他家庭成员的id
    }
  } else {
    // 发布助教的
    data = {
      openid: app.globalData.openId,
      unionid: app.globalData.unionId,
      authorId: app.globalData.userId,
      authorType: app.globalData.userType,
      recordId: recordId, //纪录的id
      familiIds: familyIds, //其他家庭成员的id
      assistId: assistId, // 助教的id,也可能不传, 如果是班主任发的纪录, 那么则没有助教也是可能的
    }
  }
  console.info(JSON.stringify(data))
  // return
  wx.request({
    url: app.globalData.minidopeApi.review,
    data: data,
    method: 'POST',
    success: function(res) {
      return callback(0)
    }
  })
}

// 添加记录或评论
// 评论不需要studentId
// recordId 仅为修改或删除时需要
function putNewRecord(recordType, text, studentId, familyIds, pictureUrls, parentRecordId, orgAuthorId, orgAuthorType, mainTeacherId, publishRecord, recordId, assistId, callback) {
  var data = {}
  if (recordType == 2) {
    data = {
      unionid: app.globalData.unionId,
      openid: app.globalData.openId,
      authorType: app.globalData.userType, //1 teacher, 2 parent
      authorId: app.globalData.userId,

      recordType: recordType,

      text: text,
      studentId: studentId,
      familyIds: familyIds, // 学生所有家长id
      pictureUrls: pictureUrls,

      parentRecordId: parentRecordId, //如果是全新的一条记录, 则此项可以不用填,
      orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
      orgAuthorType: orgAuthorType,
    }
  } else if (recordType == 1) {
    if (app.globalData.role == 0) {
      // 助教
      data = {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
        authorType: app.globalData.userType, //1 teacher, 2 parent
        authorId: app.globalData.userId,

        recordType: recordType,

        text: text,
        studentId: studentId,
        familyIds: familyIds, // 学生所有家长id
        pictureUrls: pictureUrls,

        orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
        orgAuthorType: orgAuthorType,

        mainTeacherId: mainTeacherId, //班主任id
        isAssist: true, //是否是助教
      }

    } else if (app.globalData.role == 2) {
      // 班主任
      data = {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
        authorType: app.globalData.userType, //1 teacher, 2 parent
        authorId: app.globalData.userId,

        recordType: recordType,

        text: text,
        studentId: studentId,
        familyIds: familyIds, // 学生所有家长id
        pictureUrls: pictureUrls,

        orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
        orgAuthorType: orgAuthorType,

        publishNow: publishRecord, //立即发布
        isAssist: false, //是否是助教
      }
    }
  }


  if (recordId) {
    // 班主任改动记录
    if (assistId == 0) {
      data = {
        unionid: app.globalData.unionId,
        openid: app.globalData.openId,
        authorType: app.globalData.userType, //1 teacher, 2 parent
        authorId: app.globalData.userId,

        recordType: recordType,

        text: text,
        studentId: studentId,
        familyIds: familyIds, // 学生所有家长id
        pictureUrls: pictureUrls,

        orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
        orgAuthorType: orgAuthorType,

        publishNow: publishRecord, //立即发布
        isAssist: false, //是否是助教

        recordId: recordId, // 原纪录id  （会导致原纪录失效，插一条新记录）
      }
    } else {
      // 有助教id的情况
      if (app.globalData.role == 2) {
        // 班主任改动助教
        data = {
          unionid: app.globalData.unionId,
          openid: app.globalData.openId,
          authorType: app.globalData.userType, //1 teacher, 2 parent
          authorId: app.globalData.userId,

          recordType: recordType,

          text: text,
          studentId: studentId,
          familyIds: familyIds, // 学生所有家长id
          pictureUrls: pictureUrls,

          orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
          orgAuthorType: orgAuthorType,

          publishNow: publishRecord, //立即发布
          isAssist: false, //是否是助教

          recordId: recordId, // 原纪录id  （会导致原纪录失效，插一条新记录）
          assistId: assistId,
        }
      } else if (app.globalData.role == 0) {
        // 助教修改自己的
        data = {
          unionid: app.globalData.unionId,
          openid: app.globalData.openId,
          authorType: app.globalData.userType, //1 teacher, 2 parent
          authorId: app.globalData.userId,

          recordType: recordType,

          text: text,
          studentId: studentId,
          familyIds: familyIds, // 学生所有家长id
          pictureUrls: pictureUrls,

          orgAuthorId: orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
          orgAuthorType: orgAuthorType,

          isAssist: true, //是否是助教

          recordId: recordId, // 原纪录id  （会导致原纪录失效，插一条新记录）
          mainTeacherId: mainTeacherId,
        }
      }

    }
  }
  console.info(JSON.stringify(data))
  // return
  wx.request({
    url: app.globalData.minidopeApi.putNewRecord,
    data: data,
    method: 'POST',
    success: function(res) {
      return callback(0)
    },
    complete: function(res) {
      console.info(res)
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
  review: review,
  getoneGrowthRecordWithAppend: getoneGrowthRecordWithAppend,
  getNewMessage: getNewMessage,

  putNewRecord: putNewRecord,
  putRecordLike: putRecordLike,
  putMemberFav: putMemberFav,
  getRecordSize: getRecordSize,

  getStudents: getStudents,
  getTeachers: getTeachers,
  getParents: getParents,
  getFamily: getFamily,
}