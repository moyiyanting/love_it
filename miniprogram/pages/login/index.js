// pages/login/index.js
Page({

  data: {
    userinfo:{}
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo});
  },
  handleGetUserInfo(e){
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        username:userInfo.nickName,
        province:userInfo.province,
        country:userInfo.country,
        city:userInfo.city,
        avatarUrl:userInfo.avatarUrl,
        gender:userInfo.gender,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          userInfo
        })
        wx.showToast({
          title: '登录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          title: '登记失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

   wx.navigateBack({
     delta: 1, // 回退前 delta(默认为1) 页面
   })
}
})