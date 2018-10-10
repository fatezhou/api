//app.js
App({
  onLaunch: function() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        if(res.model == "iPhone X"){
          that.globalData.isIpx = true
        }else{
          that.globalData.isIpx = false
        }     
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // heart
    //     wx.request({
    //       url: this.globalData.heartBeat,
    //       method: 'post',
    //       success:function(res) {
    // console.info(res)
    //         console.log('连接成功')
    // that.initEventHandle()
    //   }
    // })
    // let that = this
    // wx.connectSocket({
    //   url: this.globalData.heartBeat,
    //   method:'post',
    //   success() {
    //     console.log('连接成功')
    //     that.initEventHandle()
    //   }
    // })

  },
  globalData: {
    userInfo: null,
    userId: '',
    userType: 1,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxc3cdca6978c3b5ba",
    oneGrowthRecordWithAppendUrl: "https://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
    bindPhone: 'https://api.minidope.com/api/v1.0/bindPhone',
    minodopeApi: {
      loginUrl: "https://api.minidope.com/api/v1.0/login",
      contactUrl: "https://api.minidope.com/api/v1.0/get_contact",
      recordSizeUrl: "https://api.minidope.com/api/v1.0/get_child_growth_record_count",
    },
    phoneVcode: "https://api.minidope.com/api/v1.0/phone-vcode",
    getTeacherInfo: "https://api.minidope.com/api/v1.0/get_teacher_info",
    putNewRecord: 'https://api.minidope.com/api/v1.0/put_new_record',
    getCdnToken: 'https://api.minidope.com/api/v1.0/get_cdn_token',
    putMemberFav: "https://api.minidope.com/api/v1.0/put_member_fav",
    getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
    getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
    getParentsInfo: "https://api.minidope.com/api/v1.0/get_parents_info",
    getFamily: 'https://api.minidope.com/api/v1.0/get_family',
    putRecordLike: 'https://api.minidope.com/api/v1.0/put_record_like',
    getChildGrowthRecordCount: 'https://api.minidope.com/api/v1.0/get_child_growth_record_count',
    getPrePics: 'https://api.minidope.com/api/v1.0/get_pre_pics',
    putFormId: 'https://api.minidope.com/api/v1/put_form_id',
    getNewMessage: 'https://api.minidope.com/api/v2.0/get_new_message',
    // 获得全部家长信息  --> 新增代码
    getParentsInfo: "https://api.minidope.com/api/v1.0/get_parents_info",
      //  <-- 新增代码
    headImg: 'https://ouat-file.buzaishudian.com/images/wx-mini/teacher/ui/default-avatar.png',
    // 心跳
    heartBeat: 'https://api.minidope.com/api/v1.0/heart_beat',
    Imgpath: '',

    studentRecordCount: '',
    contact: {},
    teacherInfo: {},
    allTeacherInfo: null,
    allParentInfo: null,
    allStudent: null, // 通讯录
    qiniup: 'https://up-z2.qiniup.com',
    stararr: [], // 有星标的

    perTeacherRecords: '',

    recordsList: '', //首页学员记录（特定老师）
    indexSize: '',
    chooseStudent: '',

    recordId: null,
    memberListLength: null,
    stararrLength: null,

    likes: [],

    norecord: '',
    isIpx:false,
    recordWithAppends:'',
  }
})