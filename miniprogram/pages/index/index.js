// pages/index/index.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    banner:[],
    classfiy:[],
    raise:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    db.collection("swiper").get({
      success:function(res){
        console.log('轮播图获取成功',res)
          that.setData({
            banner:res.data
          })
      },
      fail:function(res){
        console.log('轮播图获取失败',res)
      }
    })
    db.collection("classfiy").get({
      success:function(res){
        console.log('按钮获取成功',res)
        that.setData({
          classfiy:res.data
        })
      },
      fail:function(res){
        console.log('按钮获取失败',res)
      }
    })
    db.collection("raise").get({
      success:function(res){
        console.log('按钮获取成功',res)
        that.setData({
          raise:res.data
        })
      },
      fail:function(res){
        console.log('按钮获取失败',res)
      }
    })
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击跳转到领养页面
   */
  adoption:function(){
    wx.navigateTo({
      url: '/pages/adoption/index'
    })
  },
    /**
   * 点击跳转到送养页面
   */
  feeding:function(e){
    wx.navigateTo({
      url: '/pages/feeding/index'
    })
  },
      /**
   * 点击跳转到爱心募捐页面
   */
  raise:function(e){
    wx.navigateTo({
      url: '/pages/raise/index',
    })
  }
})