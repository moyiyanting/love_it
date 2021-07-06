import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js";
// import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data:{
    address:{}
  },
  onShow(){
    const address = wx.getStorageSync('address');
    this.setData({
      address
    })
  },
  onLoad: function (options) {
    let that = this
    const db = wx.cloud.database();
        db.collection("arr").get({
          success:function(res){
            console.log('地址信息获取成功',res)
              that.setData({
                arr:res.data
              })
          wx.setStorageSync('arr', arr);
          },
          fail:function(res){
            console.log('地址信息获取失败',res)
          }
        })

    

  },
  async handleChoseAddress(){
    try {
      const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    if(scopeAddress===false){
      await openSetting();
    }
    let address= await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
    wx.setStorageSync('address', address);
  }
  catch (error) {
    console.log(error);
}
  }
})