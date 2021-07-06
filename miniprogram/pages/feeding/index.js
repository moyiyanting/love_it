// pages/feeding/index.js
const api=require('../../api/api');
const db=wx.cloud.database()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    imgFiles:[],
    petType:['狗狗','猫猫','兔兔','其他']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //this.getpetType();
  },


  /**发布送养*/
  // async submitData(event){
    // let imgFiles=this.data.imgFiles;
    // api.tobase64(imgFiles).then(res=>{
    //   console.log(res);
    // })

    // wx.showLoading({
    //   title:'正在上传',
    // })
    // // /**先上传图片到云存储 */
    // let imgFiles=this.data.imgFiles;
    // console.log(imgFiles)
    // //转base64编码
    // let base64=await api.tobase64(imgFiles);
    // let fileID=await api.uploadCloud(base64);

    // console.log(fileID) 
    /**上传数据到云存储 */
    //拿到用户填写的文本值
  //   let {petName,petType,kind_detail,years,color}=event.detail.value;
  //   api.callfun("add",{
  //     collectionName:"adoption_pet",
  //     data:{
  //       petName,
  //       petType,
  //       kind_detail,
  //       years,
  //       color,
  //       feeding_pic:res.fileID
  //     }
  //   }).then(res=>{
  //     wx.hideLoading()
  //     wx.showToast({
  //       title:'上传成功',
  //     })
  //   })
  //   console.log(event.detail.value)
  // },

  // /**选择图片 */


  upload_img:function(){
    let that=this
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success (res) {
        // console.log(res)
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为："+timestamp);
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:"feeding_pic/"+timestamp+'.png',
          filePath:tempFilePaths[0],
          success:function(res){
            that.setData({
              imgFiles:that.data.imgFiles.concat(res.fileID)
            })
          },
          fail:function(res){

          }
        })
      }
    })
  },

  //输入备注
  noteInput(e) {
    let that = this;
    that.setData({
          note_counts: e.detail.cursor,
          notes: e.detail.value,
    })
},

  /**提交 */
  submitData:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.petName!==""&&e.detail.value.petType!==""&&e.detail.value.kind_detail!==""&&e.detail.value.years!==""&&e.detail.value.color!==""&&e.detail.value.notes!==""&&that.data.imgFiles.length!==0){
    api.callfun("add",{
      collectionName:"adoption_pet",
      data:{
        petName:e.detail.value.petName,
        petType:e.detail.value.petType,
        kind_detail:e.detail.value.kind_detail,
        years:e.detail.value.years,
        color:e.detail.value.color,
        feeding_pic:that.data.imgFiles,
        notes:that.data.notes
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title:'上传成功',
      })
      wx.switchTab({
        url:'/pages/index/index'
      })
    })
    console.log(event.detail.value)
  }else{
    wx.showToast({
      title: '你还有未上传信息！',
      icon:"none"
    })
  }
},



  // chooseImage(){
  //   let imgFiles=this.data.imgFiles;
  //   wx.chooseImage({
  //     count: 9,
  //     sizeType: ['compressed'],
  //     sourceType: ['album','camera'],
  //     success:(res)=> {
  //       // console.log(res)
  //        imgFiles=imgFiles.concat(res.tempFilePaths);
  //        this.setData({
  //          imgFiles
  //        })
  //        console.log(imgFiles); 
  //     }
  //   })
  // },
  /**点击查看大图 */
    showBig(){
      wx.previewImage({
        urls: this.data.imgFiles,
      })
    },
  //获宠物种类
  /**petType：数据库名 */
  // getpetType(){
  //   api.find("petType").then(res=>{
  //     this.setData({
  //       petType:res.data
  //     })
  //   })
  // }

})
