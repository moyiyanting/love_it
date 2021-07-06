// pages/message/index.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    messagelist:[{}],
  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  goTocontactPage: function () {
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },

  goToSystemPage: function () {
    wx.navigateTo({
      url: '/pages/system/system',
    })
  },

  goToDianzanPage: function () {
    wx.navigateTo({
      url: '/pages/dianzan/dianzan',
    })
  },

  goToCommentPage: function () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },

  goToConcernPage: function () {
    wx.navigateTo({
      url: '/pages/concern/concern',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection("messagelist").get({
      success:function(res){
        console.log('获取成功',res)
          that.setData({
            messagelist:res.data
          })
      },
      fail:function(res){
        console.log('获取失败',res)
      }
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

  }


})