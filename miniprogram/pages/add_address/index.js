// pages/add_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    number:'',
    add_code:'',
    city:'',
    de_address:'',
    addressList:{}
  },
  onShow(){
    const arr = wx.getStorageSync('addressList');
    this.setData({
      arr
    })
  },
  name:function(e){
   this.setData({
      name: e.detail.value,
    })
  },
  number: function(e){
   this.setData({
      number: e.detail.value,
    })
  },
  add_code: function(e){
   this.setData({
      add_code: e.detail.value,
     // add_address:[{add_code:add_code}]
    })
    },
  city: function(e){
   this.setData({
      city: e.detail.value,
     // add_address:[{city:city}]
    })
    },
  de_address: function(e){
     this.setData({
      de_address: e.detail.value,
      //add_address:[{de_address:de_address}]
    })
  },
  add_handle:function(e){
    const db = wx.cloud.database();
    if(!this.data.name.trim()){
      wx.showToast({
        title: '请填写您的姓名！',
        icon: 'none',
        mask:true
      });
      return;
    }
    if(!this.data.number.trim()){
      wx.showToast({
        title: '请填写您的电话！',
        icon: 'none',
        mask:true
      });
      return;
    }
    if(!this.data.add_code.trim()){
      wx.showToast({
        title: '请填写您的邮政编码！',
        icon: 'none',
        mask:true
      });
      return;
    }
    if(!this.data.city.trim()){
      wx.showToast({
        title: '请填写您的城市！',
        icon: 'none',
        mask:true
      });
      return;
    }
    if(!this.data.de_address.trim()){
      wx.showToast({
        title: '请填写您的详细地址！',
        icon: 'none',
        mask:true
      });
      return;
    }
    db.collection('arr').add({
      data: {
        name:this.data.name,
        number:this.data.number,
        add_code:this.data.add_code,
        city:this.data.city,
        de_address:this.data.de_address,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          data: {
            name:this.data.name,
            number:this.data.number,
            add_code:this.data.add_code,
            city:this.data.city,
            de_address:this.data.de_address,
          },
        })
        wx.showToast({
          title: '添加地址成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          title: '添加地址失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    var addressList = {
      name:this.data.name,
      number:this.data.number,
      add_code:this.data.add_code,
      city:this.data.city,
      de_address:this.data.de_address,
    }
      var arr= wx.getStorageSync('addressList') || [];
      arr.push(addressList);
      wx.setStorageSync('addressList', arr);
    console.log("arr,{}", arr);
    wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
  },
})