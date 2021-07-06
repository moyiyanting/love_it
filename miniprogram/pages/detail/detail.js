// miniprogram/pages/detail.js
const db = wx.cloud.database();
//获取数据库集合
const dbData = db.collection('community');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    community:[],
    msgDetail:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database()
    db.collection('community').doc(options.id).get({
      success:res=> {
        console.log(res.data)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        let msgDetail=res.data
        this.setData({
          //将从云端获取的数据放到testList中
          msgDetail:res.data,
        })
      },
      fail: console.error
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