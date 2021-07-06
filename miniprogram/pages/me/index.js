
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
    wx.navigateBack({
      delta: 1,
    })
}
})