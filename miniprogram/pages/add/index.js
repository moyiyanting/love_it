// pages/add/index.js
const api=require('../../api/api');
const db=wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: [],
    // bookType: ['教科书', '辅导资料', '小说', '文学', '历史', '哲学', '艺术', '散文', '其他'],
    goodsType: ['小贴士','宠物训练','宠物知识', '配种'],
    showPopup: false,
    community: {
      g_type: '',
      isNew: false,
      title: '',
      description:'',
      phone: '',
      info: "",
      pub_type: -1,
      pic_url: new Array()
    },
  
    tempFilePaths: [],
    phone_err: '',
    price_err: '',
    descrip_err: '',
    title_err: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('****', options)
    let { pub_type } = options;
    const { goodsType, bookType, community } = this.data;
    pub_type = parseInt(pub_type, 10);
    community['pub_type'] = pub_type;
    console.log(pub_type === 1);
    if (pub_type) {
      this.setData({
        community,
        columns: bookType
      })
    } else {
      this.setData({
        community,
        columns: goodsType
      })
    }
  },

  onClosePopup() {
    this.setData({
      showPopup: false
    })
  },

  tapToShow() {
    this.setData({
      showPopup: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onConfirm(event) {
    console.log(event)
    const { value } = event.detail;
    const { community } = this.data;
    community['g_type'] = value;
    console.log(value);
    this.setData({
      community,
      showPopup: false
    })
  },
  // 保存信息
  saveMessage(e) {
    console.log(e);
    // console.log(this.data);
    const { type } = e.currentTarget.dataset;
    // console.log({type})
    const { community } = this.data;
    console.log({community})
    // console.log(e.detail)
    community[type] = e.detail;
// console.log(community[type])
console.log(community)
    this.setData({
      community,
      phone_err: '',
      price_err: '',
      descrip_err: '',
      title_err: ''
    })
  },
  // 上传图片
  doUpload(filePath) {
    const that = this;
    const arr = filePath.split('/');
    const name = arr[arr.length - 1];
    // 上传图片
    // const filePath = res.tempFilePaths[0]
    const cloudPath = 'fabu_picture/'+`${Date.now()}-${Math.floor(Math.random(0, 1) * 10000)}` + filePath.match(/\.[^.]+?$/)[0]

    // const cloudPath = 'fabu_picture/' + name;

    wx.cloud.uploadFile({
      cloudPath,
      filePath
    }).then(res => {
      console.log('上传图片 成功：', res)
      const { community } = that.data;
      const { pic_url } = community;
      pic_url.push(res.fileID);
      community['pic_url'] = pic_url;
      that.setData({
        community
      });
    }).catch(error => {
      console.error('上传文件失败：', error);
      wx.showToast({
        title: '上传失败',
        duration: 1000
      })
    })

  },
// // 删除照片
//   deletePic(e) {
//     console.log(e);
//     const { index } = e.currentTarget.dataset;
//     const { tempFilePaths } = this.data;
//     tempFilePaths.splice(index, 1);
//     this.setData({
//       tempFilePaths
//     })

//   },
  chooseImage: function () {
    const that = this;
    // 选择图片
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const filePath = res.tempFilePaths;
        //将选择的图片上传
        filePath.forEach((path, index) => {
          that.doUpload(path);
        });
        const { tempFilePaths } = that.data;
        that.setData({
          tempFilePaths: tempFilePaths.concat(filePath)
        }, () => {
          console.log(that.data.tempFilePaths)
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  // 校验填入的信息
  checkParams(community) {
    const { g_type, title, description, phone,info, pub_type } = community;
    let temp = 1;
    //判断手机号格式是否正确
    if (phone === '') {
      this.setData({
        phone_err: '请输入手机号'
      })
      temp = 0;
    } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
      this.setData({
        phone_err: '手机号输入有误'
      });
      temp = 0;
    }

    // //校检手机
    // let phone = that.data.phone;
    // if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
    //   wx.showToast({
    //     title: '请先正确填写您的电话',
    //     icon: 'none',
    //     duration: 2000
    //   });
    //   return false
    // }

    //判断商品类型是否为空
    let msg = 'error'
    if (pub_type === 0) {
      msg = '请选择商品类型';
    } 
    if (!g_type) {
      wx.showToast({
        title: msg,
        duration: 1000
      });
      temp = 0;
    }

    // // 判断描述是否为空
    // if (!article) {
    //   this.setData({
    //     descrip_err: '请填写描述信息'
    //   });
    //   temp = 0;
    // }

    //判断标题是否为空
    if (!title) {
      this.setData({
        title_err: '请填写标题'
      });
      temp = 0;
    }

  //   //判断价格是否为空
  //   if (!price) {
  //     this.setData({
  //       price_err: '请填写价格'
  //     });
  //     temp = 0;
  //   }
  //   return temp;
  },
  // 获取当前时间 和login方法不同
  timeConvert(time) {
    const changeTime = num => {
      if (num < 10) {
        num = `0${num}`;
      }
      return num;
    }
    const y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    m = changeTime(m);
    d = changeTime(d);
    h = changeTime(h);
    mm = changeTime(mm);
    s = changeTime(s);
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
  },
// // 发布
//   toPublish() {
//     const { community } = this.data;

//     //发布前校验
//     const temp = this.checkParams(community);
//     if (temp) {
//       wx.showLoading({
//         title: '发布中',
//       });

//       // const { nickName, avatarUrl } = app.globalData.userInfo;
//       // community.userDetail = {
//       //   nickName,
//       //   avatarUrl
//       // }
//       community['pub_time'] = this.timeConvert(new Date());
//       console.log(community);

//       wx.cloud.callFunction({
//         name: 'publi_goods',
//         data: community,

//         success: res => {
//           wx.hideLoading();
//           wx.showToast({
//             title: '发布成功',
//             icon: 'success',
//             duration: 1000,
//             success: () => {
//               setTimeout(() => {
//                 wx.navigateBack();
//               }, 1000)
//             }
//           })
//         },
//         fail: err => {
//           console.log(err);
//           wx.hideLoading();
//           wx.showToast({
//             title: '发布失败',
//             duration: 1000,
//             success: () => {
//               setTimeout(() => {
//                 wx.navigateBack();
//               }, 1000)
//             }
//           })
//         }
//       })
//     }
//   }


toPublish:function(e){
  let that = this
  const { community } = this.data;
  console.log(e)

      //发布前校验
    const temp = this.checkParams(community);
    // if (temp) {
    //   wx.showLoading({
    //     title: '发布中',
    //   });
      community['pub_time'] = this.timeConvert(new Date());
  // if(e.detail.value.petName!==""&&e.detail.value.petType!==""&&e.detail.value.kind_detail!==""&&e.detail.value.years!==""&&e.detail.value.color!==""&&e.detail.value.notes!==""&&that.data.imgFiles.length!==0){
  api.callfun("add",{
    collectionName:"fabu",
    data:{
      // title:that.data.title,
      fabu_picture:that.data.tempFilePaths,
      data:community
    }
  }).then(res=>{
    wx.hideLoading()
    wx.showToast({
      title:'上传成功',
    })
  })
  console.log(event.detail.value)
// }else{
//   wx.showToast({
//     title: '你还有未上传信息！',
//     icon:"none"
//   })
// }
},

})
