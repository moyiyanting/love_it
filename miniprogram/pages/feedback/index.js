// pages/feedback/index.js
Page({
  data:{
    tabs:[
       {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商家投诉",
        isActive:false
      }
    ],
    chooseImgs:[],
    textValue:''
  },
  UpLoadImgs:[],
  handleTabsItemChange(e){
    const {index}=e.detail;
    let{tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData(
      {
        tabs
      }
    )
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result)=>{
        // success
        this.setData({
           chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    })

  },
  handleRemoveImg(e){
    const {index}=e.currentTarget.dataset;
    let{chooseImgs}=this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  handleFormSubmit(){
    const  textValue=this.data. textValue;
    const chooseImgs=this.data.chooseImgs;
    const db = wx.cloud.database();
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask:true
      });
      return;
    }
    if(chooseImgs.length!=0){
      chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        filePath: v,
        name:"file",
        formData: {}, // HTTP 请求中其他额外的 form data
        success: (result)=>{
          console.log(result);
          let url=JSON.parse(result.data).url;
          this.UpLoadImgs.push(url);
          if(i===chooseImgs.length-1){
            wx.hideLoading();
            this.setData({
              textValue:"",
              chooseImgs:[]
            })
        }
      }
  });
  })
    }
    else{
      wx.hideLoading();
    }
    db.collection('feedback').add({
      data: {
        textValue:this.data.textValue,
        Imgs:this.data.chooseImgs,
        tabs:this.data.tabs
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          data: {
            textValue:this.data.textValue,
            Imgs:this.data.chooseImgs,
            tabs:this.data.tabs
          },
        })
        wx.showToast({
          title: '反馈成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          title: '反馈失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

   wx.navigateBack({
     delta: 1, // 回退前 delta(默认为1) 页面
   })
  }
})