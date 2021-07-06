// pages/contact/contact.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.connectSocket({
      // 本地服务器地址
      url: 'wss://localhost:3000',
    })
    // 连接成功
    wx.onSocketOpen(function() {
      console.log('连接成功');
    })
    wx.onSocketMessage(msg => {
      var data = JSON.parse(msg.data)
      data.id = this.id++
      data.role = 'server'
      var list = this.data.list
      list.push(data)
      this.setData({
        list: list
      })
      this.rollingBottom()
    })
  },

  // 发送内容
  count: 0,
  massage: '',
  send: function() {
    // 判断发送内容是否为空
    if (this.message) {
      wx.sendSocketMessage({
        data: this.message,
      })
      // 我自己的消息
      console.log(this.data.list)
      var list = this.data.list
      list.push({
        id: this.count++,
        content: this.message,
        role: 'me'
      })
      this.setData({
        list: list
      })
      this.rollingBottom()
    } else {
      // 弹出提示框
      wx.showToast({
        title: '消息不能为空哦~',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 监听input值的改变
  bindChange(res) {
    this.message = res.detail.value
  },
  // 页面卸载，关闭连接
  /**onUnload() {
    wx.onSocketClose();
    wx.showToast({
      title: '连接已断开~',
      icon: 'none',
      duration: 2000
    })
  },**/
  // 聊天内容始终显示在最低端
  rollingBottom(e) {
    wx.createSelectorQuery().selectAll('.list').boundingClientRect(rects => {
      rects.forEach(rect => {
        this.setData({
          scrollTop: rect.bottom
        })
      })
    }).exec()
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