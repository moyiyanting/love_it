// // pages/projectDetail/projectDetail.js
// const app = getApp();
// // var WxParse = require('../../wxParse/wxParse.js');

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     showTabCon: 0, //默认显示项目详情
//     tabNav: ["项目详情","项目动态","捐赠记录"],
//     showLay:false,
//     precent:"30",
//     toggleHover:false,
//     selMoneyIndex:0,
//     project: {},
//     id: null,
//     isCollection: false,
//     itemIndex: 0,
//     openid:null
//   },
//   getOpenId:function(){
//   //   var that = this;
//   //   wx.login({
//   //     success: res => {
//   //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
//   //       wx.request({
//   //         // url: app.globalData.domain + '/MiniProgramApi/Req_MiniProgramOpenId',
//   //         method: "POST",
//   //         data: {
//   //           Code: res.code,
//   //           OrganizationId: app.globalData.OrganizationId
//   //         },
//   //         success: function (res) {
//   //           console.log(res);
//   //           if (res.data.Success) {
//   //             that.setData({
//   //               openid:res.data.Data
//   //             })
//   //           }
//   //         }
//   //       })
//   //     }
//   //   })
//   },
//   // tab 切换
//   tabNav(e) {
//     let index = e.currentTarget.dataset.index;
//     this.setData({
//       showTabCon: index
//     })
//   },
//   // 捐款
//   donateMoney(){
   
//     this.setData({
//       showLay: true
//     })
   
//   },
  
//   donate: function(){
//     wx.navigateTo({
//       url: '/pages/coDonate/coDonate?id=' + this.data.id,
//     })
//   },

//   getExPand: function(id){
//     // var that = this;
//     // wx.request({
//     //   // url: app.globalData.domain + '/CommonApi/Req_QueryExpand',
//     //   data: {
//     //     OrganizationId: app.globalData.OrganizationId,
//     //     LinkTableID: id,
//     //     LinkTableType: "4",
//     //     SearchKey: "",
//     //     TypeID: "-1",
//     //     PageIndex: 1,
//     //     PageSize: 10
//     //   },
//     //   method: "POST",
//     //   success: function (res) {
//     //     if (res.data.Return_Code == 1) {
//     //       that.setData({
//     //         dynamic: res.data.Data.PageData
//     //       })
//     //     }
//     //   }
//     // })
//   },

//   getProjectDetail: function () {
//   //   var that = this;
//   //   wx.request({
//   //     url: app.globalData.domain + '/PublicFinancingApi/Req_GetPublicFinancingDetail',
//   //     data: {
//   //       OrganizationId: app.globalData.OrganizationId,
//   //       Id: id
//   //     },
//   //     method: "POST",
//   //     success: function (res) {
//   //       if (res.data.Return_Code == "1") {
//   //         var data = res.data.Data;
//   //         if (data.PfStatus==1)
//   //         {
//   //           data.PfStatus = "正在筹款";
//   //         }
//   //         else if (data.PfStatus == "2") {
//   //           data.PfStatus = "筹款结束";
//   //         }
//   //         else if (data.PfStatus == "8") {
//   //           data.PfStatus = "正在执行";
//   //         }
//   //         else if (data.PfStatus == "9") {
//   //           data.PfStatus = "执行完毕";
//   //         }
//   //         else {
//   //           data.PfStatus = "未知状态";
//   //         }
//   //         that.setData({
//   //           project: data
//   //         })
//   //         WxParse.wxParse('article', 'html', res.data.Data.Detail, that, 5);
//   //       }
//   //     }
//   //   })
//   },

//   getRecord: function (id){
//     // var that = this;
//     // wx.request({
//     //   // url: app.globalData.domain + '/PublicFinancingApi/Req_QueryDonationsList',
//     //   data: {
//     //     OrganizationId: app.globalData.OrganizationId,
//     //     PublicFinancingId: id,
//     //     PageIndex: 1,
//     //     PageSize: 10
//     //   },
//     //   method: "POST",
//     //   success: function (res) {
//     //     if (res.data.Return_Code == 1) {
//     //       that.setData({
//     //         recordList: res.data.Data.PageData
//     //       })
//     //     }
//     //   }
//     // })
//   },

//   // 关闭弹窗
//   closeLayer(){
//     this.setData({
//       showLay: false
//     })
//   },
//   // toggle 留言框
//   toggleMsg(){
//     this.setData({
//       toggleHover: !this.data.toggleHover
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     this.setData({
//       id: options.id,
//       domainImage: app.globalData.domainImage
//     })
//     this.getOpenId();
//     this.getProjectDetail(options.id);
//     this.getRecord(options.id);
//     this.getExPand(options.id);
//   },

//   collection: function(e){
//     var that = this;
//     wx.request({
//       url: app.globalData.domain + '/CollectionApi/Req_SaveCollection',
//       data: {
//         OrganizationId: app.globalData.OrganizationId,
//         CollectionId: that.data.id,
//         CollectionType: 0,
//         CollectionTitle: that.data.project.Title,
//         CollectionHeadImage: that.data.project.TitleImgURL,
//         CollectionDetail: '',
//         CollectionUrl: "/pages/projectDetail/projectDetail?id="+ that.data.id
//       },
//       header: {
//         "Authorization": 'bearer ' + app.globalData.token
//       },
//       method: "POST",
//       success: function (res) {
//         if (res.data.Return_Code == 1) {
//           wx.showModal({
//             title: '提示',
//             content: '收藏成功',
//             showCancel: false
//           })
//         }
//       }
//     })
//   },

//   unCollection: function (e) {
//     var that = this;
//     wx.request({
//       url: app.globalData.domain + '/CollectionApi/RemoveCollection',
//       data: {
//         OrganizationId: app.globalData.OrganizationId,
//         CollectionId: id,
//         CollectionType: 0
//       },
//       header: {
//         "Authorization": 'bearer ' + app.globalData.token
//       },
//       method: "POST",
//       success: function (res) {
//         if (res.data.Return_Code == 1) {
//           that.setData({
            
//           })
//         }
//       }
//     })
//   },

//   donation: function(e){
//     var that = this;
//     console.log(this.data.project)
//     if (this.data.project.PfStatus != "正在筹款"){
//       wx.showModal({
//         title: '提示',
//         content: '捐款已停止',
//         showCancel: false
//       })
//       return;
//     }
//     var Message = e.detail.value.Message;
//     if(!Message){
//       Message = '加油';
//     }
//     var DonMoney = "20";
//     var itemIndex = this.data.itemIndex;
//     if (itemIndex == 1){
//       DonMoney = "50";
//     } else if (itemIndex == 2){
//       DonMoney = "100";
//     } else if (itemIndex == 3){
//       var money = e.detail.value.DonMoney;
//       if(!money){
//         wx.showModal({
//           title: '提示',
//           content: '请输入捐款金额',
//           showCancel: false
//         })
//         return;
//       }
//       DonMoney = money;
//     }
    
//     var postData = {
//       "FinancingId": this.data.id,
//       "DonorName": app.globalData.userInfo.NickName,
//       "Message": Message,
//       "Address": "无",
//       "ExpressInfo": "",
//       "PayType": 3,
//       "SemesterId": "",
//       "OpenId": this.data.openid,
//       "UserHeadImage": "",
//       "DonMoney": DonMoney,
//       "Account": app.globalData.userInfo.Account,
//       "TeamId": app.globalData.userInfo.TeamId,
//       "FeeSource": "0"
//     }

//     wx.request({
//       url: app.globalData.domain + '/PublicFinancingApi/Req_SavePFDonation',
//       data: postData,
//       header: {
//         "Authorization": 'bearer ' + app.globalData.token
//       },
//       method: "POST",
//       success: function (res) {
//         console.log(res)
//         if (res.data.Return_Code == 1) {
//           wx.requestPayment({
//             timeStamp: res.data.Data.TimeStamp,
//             nonceStr: res.data.Data.NonceStr,
//             package: res.data.Data.Package,
//             signType: 'MD5',
//             paySign: res.data.Data.PaySign,
//             fail: function (resp) {
//               wx.showToast({
//                 icon: 'none',
//                 title: '支付失败'
//               })
//             },
//             success: function (resp) {
//               wx.navigateTo({
//                 url: '/pages/donateok/donateok?id=' + res.data.Data.BiilNo + "&pfid=" + res.data.Data.PFId + "&money=" + DonMoney + "&finType=" + that.data.project.FinType,
//               })
//             }
//           })
          
//         }else{
//           wx.showModal({
//             title: '提示',
//             content: res.data.Return_Msg,
//             showCancel: false
//           })
//         }
//       }
//     })
//   },

//   tabItem: function (e) {
//     console.log(e)
//     var id = e.currentTarget.dataset.id;
//     this.setData({
//       itemIndex: id
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   }
// })

Page({
  data: {
    price: 0.01
  },

  onInput(event) {
    this.setData({ price: event.detail.value });
  },

  pay() {
    const price = parseFloat(this.data.price).toFixed(2);
    wx.showLoading({
      title: ''
    });
    wx.cloud.callFunction({
      name: 'pay',    // 调用pay函数
      data: { price }, // 支付金额
      success: (res) => {
        wx.hideLoading();
        const { result } = res;
        const { code, data } = result;
        if (code !== 0) {
          wx.showModal({
            title: '提示',
            content: '支付失败',
            showCancel: false
          });
          return;
        }
        console.log(data);
        wx.requestPayment({
          timeStamp: data.time_stamp,
          nonceStr: data.nonce_str,
          package: `prepay_id=${data.prepay_id}`,
          signType: 'MD5',
          paySign: data.sign,
          success: () => {
            wx.showToast({title: '支付成功'});
          }
        });
      },
      fail: (res) => {
        wx.hideLoading();
        console.log('FAIL');
        console.log(res);
      }
    });
  }
});