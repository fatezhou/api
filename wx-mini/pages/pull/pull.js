const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    imgs: [], //本地图片地址数组
    message: '',
    submitTime: 1,
    tempFilePaths: {}, //本地图片地址对象
    canChoose: true, //是否可选图片
    imgString: '', //图片拼接后的字符串
    studentId: 0,
    type: 1,
    orgAuthorId: 0,
    orgAuthorType: 1,
    recordId: 0,
    name: "",

    downloadUrl: '',
    pictureUrls: [],

    prepareToUpload: [],

    hindname: false,

    calltext: null,
    addtext: null,
    placeholder: '填写内容(12-500字)',
    choosestudent: false,


    Imgpath: '',
    avatarUrl: '',
  },
  charChange: function(e) {
    if (this.data.calltext) {
      var text = this.data.calltext + e.detail.value
    } else {
      var text = e.detail.value
    }

    console.info(text)
    text = encodeURIComponent(text)
    this.setData({
      addtext: text
    })

  },
  submit: function() {

    if (this.data.addtext == undefined || this.data.tempFilePaths == {}) {
      wx.showToast({
        title: '您还没输入内容呢',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }
    if (this.data.name == '请选择学员') {
      wx.showToast({
        title: '请选择学员',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }

    var that = this;
    var gData = app.globalData;
    console.info(that.data);

    for (var i in this.data.prepareToUpload) {
      wx.uploadFile({
        url: app.globalData.qiniup,
        filePath: this.data.prepareToUpload[i].localFilePath,
        name: "file",
        header: 'Content-Type: multipart/form-data;',
        method: 'post',
        formData: {
          token: this.data.prepareToUpload[i].token,
          key: this.data.prepareToUpload[i].key,
        },
        success: function(res) {
          // console.info(res)
        },
        complete: function(res) {
          console.info(res)
        }
      });
    }
    that.addRecard();
  },

  addRecard() {
    wx.showToast({
      title: '发送中...',
      icon: 'success',
      image: '',
      duration: 1000,
      mask: true,
    })
    var gData = app.globalData;
    var that = this;
    var pictureUrls = [];
    for (var i in this.data.prepareToUpload) {
      pictureUrls.push(this.data.prepareToUpload[i].downloadUrl);
    }
    // var text = null;
    // if (this.data.calltext) {
    //   text = this.data.calltext + that.data.text
    //   console.info(11111)
    //   console.info(text)
    // } else {
    //   text = that.data.text
    //   console.info(22222)
    //   console.info(text)
    // }

    console.info(pictureUrls)
    console.info('------------')
    wx.request({
      url: app.globalData.putNewRecord,
      data: {
        "unionid": gData.unionid,
        "openid": gData.openid,
        "authorType": gData.userType, //1 teacher, 2 parent
        "text": that.data.addtext,
        "authorId": gData.teacherInfo.teacherId,
        "studentId": that.data.studentId, //如果是评论的话, 则此项可以不用填,
        "pictureUrls": pictureUrls,
        "recordType": that.data.type, //1:record,2:append",
        "parentRecordId": that.data.recordId, //如果是全新的一条记录, 则此项可以不用填,
        "orgAuthorId": that.data.orgAuthorId == 0 ? gData.userId : that.data.orgAuthorId, //原作者的id, 如果这是一条全新的, 那么就填自己
        "orgAuthorType": that.data.orgAuthorId == 0 ? gData.userType : that.data.orgAuthorType, //原作者的type
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options)
    this.setData({
      Imgpath: app.globalData.Imgpath,
    })
    if (options.avatarUrl) {
      this.setData({
        avatarUrl: options.avatarUrl
      })
    }

    if (options.choosestudent == 'true') {
      this.setData({
        name: '请选择学员',
        choosestudent: true
      })
    }

    if (options.type == "append") {
      wx.setNavigationBarTitle({
        title: '评论'
      });
      this.data.type = 2;
    }
    this.data.studentId = parseInt(options.studentId);
    this.data.recordId = parseInt(options.recordId);
    console.info("pull");
    console.info(this.data);
    var contact = app.globalData.contact;
    for (var i in contact) {
      if (contact[i].studentId == this.data.studentId) {
        this.data.name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
        this.data.name = contact[i].name;
        console.info(contact[i]);
        console.info("find!!!!" + this.data.name);
        this.setData(this.data);
        break;
      }
    }

    if (options.name && options.studentId) {
      this.setData({
        name: options.name
      })
    }

    if (options.hindname) {
      console.info(options.hindname)
      this.setData({
        hindname: true
      })
    }

    if (options.callName) {
      this.data.calltext = '回复' + ' ' + options.callName + ' '
      this.setData({
        calltext: this.data.calltext,
        placeholder: '回复' + ' ' + options.callName + ' '
      })
      // console.info(calltext)
    }
  },

  onShow: function() {
    if (app.globalData.chooseStudent) {
      this.setData({
        name: app.globalData.chooseStudent.name,
        studentId: app.globalData.chooseStudent.studentId,
        avatarUrl: app.globalData.chooseStudent.avatarUrl,
      })
    }
  },

  getTokenAndImgUrl(imgNum, callback) {
    var imgNumber = imgNum
    var that = this
    that.getUploadImgFile(imgNumber, function(res) {
      var fileName = res;
      wx.request({
        url: app.globalData.getCdnToken,
        method: 'post',
        data: {
          appid: app.globalData.appId,
          fileName: fileName,
          action: 'z2'
        },
        success: function(res) {
          return callback(res)
        }
      })
    })
  },

  getUploadImgFile(imgNumber, callback) {
    var userId = app.globalData.userId

    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var timeArr = [year, month, day, hour, minute, second].map(formatNumber)
    var time = '';

    for (var t = 0; t < timeArr.length; t++) {
      time += timeArr[t]
    }
    console.info(time)
    var fileName = 't_' + userId + '_' + time + '_' + imgNumber + '.jpg '
    return callback(fileName)
  },

  makePicName: function(index, tmpFilePath) {
    var userId = app.globalData.userId

    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var timeArr = [year, month, day, hour, minute, second].map(formatNumber)
    var time = '';

    for (var t = 0; t < timeArr.length; t++) {
      time += timeArr[t]
    }
    console.info(time)
    var arr = tmpFilePath.split('.');
    var ext = "JPG";
    if (arr.length > 0) {
      ext = arr[arr.length - 1];
    }
    var fileName = 't_' + userId + '_' + time + '_' + index + '.' + ext;
    return fileName;
  },

  //删除上传图片
  reom(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let imgs = that.data.imgs
    for (var i = 0; i < imgs.length; i++) {
      if (index == i) {
        imgs.splice(i, 1);
        i--;
      }
    }
    that.setData({
      imgs: imgs,
    });
  },
  //添加上传图片
  chooseImageTap: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
            // wx.chooseImage({
            //   sourceType: 'album',
            //   success: function(res) {
            //     var tempFilePaths = res.tempFilePaths[0]

            //   }
            // })
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  noChoose: function() {
    var that = this;
    wx.showToast({
      title: '最多只能上传9张哦~',
      icon: 'loading',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 选取图片
  chooseWxImage: function(type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.log(res);
        var imgsLimit = [];
        var tempFilePaths = that.data.tempFilePaths;
        var imgs = that.data.imgs;
        var index = imgs.length;

        console.log(res.tempFilePaths);
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          tempFilePaths[res.tempFilePaths[i]] = '';
          console.log(res.tempFilePaths[i])
          imgs.push(res.tempFilePaths[i]);

          var encodePicFileName = that.makePicName(index, res.tempFilePaths[i]);
          index++;
          console.info(encodePicFileName);
          var self = that;
          var localFilePath = res.tempFilePaths[i];
          wx.request({
            url: app.globalData.getCdnToken,
            method: 'post',
            data: {
              appid: app.globalData.appId,
              fileName: encodePicFileName,
              localFilePath: localFilePath
            },
            success: function(res) {
              console.info(res);
              self.data.prepareToUpload.push({
                fileName: res.data.data.cdn.fileName,
                token: res.data.data.cdn.token,
                downloadUrl: res.data.data.cdn.downloadUrl,
                key: res.data.data.cdn.key,
                localFilePath: res.data.data.cdn.localFilePath
              });
              console.info(self.data.prepareToUpload);
            }
          })
        };
        if (imgs.length > 9) {
          for (var i = 0; i < 9; i++) {
            imgsLimit.push(imgs[i]);
          }
          that.setData({
            imgs: imgsLimit,
            tempFilePaths: tempFilePaths,
          });
        } else {
          that.setData({
            imgs: imgs,
            tempFilePaths: tempFilePaths,
          });
        }
        if (imgsPaths.length >= 9) {
          that.setData({
            canChoose: false,
          });
        } else {
          that.setData({
            canChoose: true,
          });
        };
      },
    })
  },
})