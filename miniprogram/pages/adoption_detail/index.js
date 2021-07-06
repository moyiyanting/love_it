// pages/adoption_detail/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petName:"",
    petType:"",
    kind_detail:"",
    color:"",
    years:"",
    notes:"",
    feeding_pic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let that = this
    console.log('领养宠物的id已经获取到了',options.id)
    db.collection('adoption_pet').doc(options.id).get({
      success:function(res){
        console.log('宠物详情信息获取成功',res)
        that.setData({
          petName:res.data.petName,
          petType:res.data.petType,
          kind_detail:res.data.kind_detail,
          color:res.data.color,
          years:res.data.years,
          feeding_pic:res.data.feeding_pic,
          notes:res.data.notes

        })
      },fail:function(res){
        console.log('宠物详情信息获取失败',res)
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