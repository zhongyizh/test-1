// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  chooseImg: function() {
    var t = this;
    wx.chooseMedia({
        count: 9,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
        //   console.log(res.tempFiles[0].tempFilePath)
        //   console.log(res.tempFiles[0].size)
          var temp = res.tempFiles[0].tempFilePath;
          t.setData({
              imgPath: temp
          })
          console.log(t.data.imgPath)
        }
      })
    },
    upload: function() {
        var t = this;
        wx.cloud.uploadFile({
            cloudPath: 'example.png', // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
            filePath: t.data.imgPath, // 微信本地文件，通过选择图片，聊天文件等接口获取
            config: {
              env: 'prod-3gkb5ki51e46717d' // 需要替换成自己的微信云托管环境ID
            },
            success: res => {
              console.log(res.fileID)
            },
            fail: err => {
              console.error(err)
            }
          })
    },
    previewImg: function(obj) {
        var img = this.data.imgPath;
        wx.previewImage({
          current: img,
          urls: [img]
        })
    }
})
