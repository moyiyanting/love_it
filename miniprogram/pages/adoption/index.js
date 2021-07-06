
//banner
var sliderWidth = 96; 
Page({
  data: {
    petType:['狗狗','猫猫','兔兔','其他'],
    activeIndex: 0, // 当前选中的标签页索引
    sliderOffset: 0, // 指示条的平移距离
    sliderLeft: 0, // 指示条的left值
    adoption_pet:[],
    pet0:[],
    pet1:[],
    pet2:[],
    pet3:[]
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.petType.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.petType.length * that.data.activeIndex
        });
      }
    });
    const db = wx.cloud.database()
    db.collection("adoption_pet").get({
      success:function(res){
        console.log('领养宠物信息获取成功',res)
          that.setData({
            adoption_pet:res.data
          })
      },
      fail:function(res){
        console.log('领养宠物信息获取失败',res)
      }
    })
    db.collection("adoption_pet").where({
      petType:'狗狗'
    }).get({
      success:function(res){
        console.log('领养宠物信息获取成功',res)
          that.setData({
            pet0:res.data
          })
      },
      fail:function(res){
        console.log('领养宠物信息获取失败',res)
      }
    })
    db.collection("adoption_pet").where({
      petType:'猫猫'
    }).get({
      success:function(res){
        console.log('领养宠物信息获取成功',res)
          that.setData({
            pet1:res.data
          })
      },
      fail:function(res){
        console.log('领养宠物信息获取失败',res)
      }
    })
    db.collection("adoption_pet").where({
      petType:'兔兔'
    }).get({
      success:function(res){
        console.log('领养宠物信息获取成功',res)
          that.setData({
            pet2:res.data
          })
      },
      fail:function(res){
        console.log('领养宠物信息获取失败',res)
      }
    })
    db.collection("adoption_pet").where({
      petType:'其他'
    }).get({
      success:function(res){
        console.log('领养宠物信息获取成功',res)
          that.setData({
            pet3:res.data
          })
      },
      fail:function(res){
        console.log('领养宠物信息获取失败',res)
      }
    })
  }

 
  // 下拉切换
  // hideNav: function () {
  //   this.setData({
  //     displays: "none"
  //   })
  // },
  //   // 区域
  // tabNav: function (e) {
  //   this.setData({
  //     displays: "block"
  //   })
  //   this.setData({
  //     selected1: false,
  //     selected2: false,
  //     selected: true
  //   })
  //   if (this.data.currentTab === e.target.dataset.current) {
  //     return false;
  //   } else {
 
  //     var showMode = e.target.dataset.current == 0;
 
  //     this.setData({
  //       currentTab: e.target.dataset.current,
  //       isShow: showMode
  //     })
  //   }
  // },
  // // 下拉切换中的切换
  // // 区域
  // selected: function (e) {
  //   this.setData({
  //     selected1: false,
  //     selected2: false,
  //     selected: true
  //   })
  // },
  // selected1: function (e) {
  //   this.setData({
  //     selected: false,
  //     selected2: false,
  //     selected1: true
  //   })
  // },
  // selected2: function (e) {
  //   this.setData({
  //     selected: false,
  //     selected1: false,
  //     selected2: true
  //   })
  // },
  // // 下拉菜单1 2 3 4
  //   // 区域
  // clickSum: function (e) {
  //   console.log(e.target.dataset.num)
  //   // console.log(e.target.dataset.name)
  //   this.setData({
  //     _sum: e.target.dataset.num
  //   })
  //   this.setData({
  //     first: e.target.dataset.name
  //   })
  //   this.setData({
  //     displays: "none"
  //   })
  //   var text = this.data.name
  //   console.log(text)
  //   db.collection("adoption_pet").where({
  //     petType:first
  //   }).get({
  //     success:function(res){
  //       console.log('领养宠物信息获取成功',res)
  //         that.setData({
  //           pet0:res.data
  //         })
  //     },
  //     fail:function(res){
  //       console.log('领养宠物信息获取失败',res)
  //     }
  //   })
  // },
  // onLoad: function (options) {
     
  // },
  // clickMum: function (e) {
  //   console.log(e.target.dataset.num)
  //   this.setData({
  //     _mum: e.target.dataset.num
  //   })
  //   this.setData({
  //     displays: "none"
  //   })
  //   var text = this.data.name
  //   console.log(text)
  // },
  // clickCum: function (e) {
  //   console.log(e.target.dataset.num)
  //   this.setData({
  //     _cum: e.target.dataset.num
  //   })
  //   this.setData({
  //     displays: "none"
  //   })
  //   var text = this.data.name
  //   console.log(text)
  // },
  // onLoad: function (options) {
 
  // },
  // // 售价
  // clickNum: function (e) {
  //   console.log(e.target.dataset.num)
  //   this.setData({
  //     _num: e.target.dataset.num
  //   })
  //   this.setData({
  //     second: e.target.dataset.name
  //   })
  //   this.setData({
  //     displays: "none"
  //   })
  //   var text = this.data.name
  //   console.log(text)
  // },
  // onLoad: function (options) {
 
  // },
  // // 房型
  // clickHouse: function (e) {
  //   console.log(e.target.dataset.num)
  //   this.setData({
  //     _res: e.target.dataset.num
  //   })
  //   this.setData({
  //     thirds: e.target.dataset.name
  //   })
  //   this.setData({
  //     displays: "none"
  //   })
  // },
  // onLoad: function (options) {
 
  // },
 
  // // 筛选
  // choseTxtColor: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   console.log(e.currentTarget.dataset.id)
  //   this.setData({
  //     one: id
  //   })
  // },
  // chaoxiang: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     two: id
  //   })
  // },
  // louceng: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     third: id
  //   })
  // },
  // zhuangxiu: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     four: id
  //   })
  // },
  // leibei: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     five: id
  //   })
  // },
  // tese: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     six: id
  //   })
  // },
  // paixu: function (e) {
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     seven: id
  //   })
  //},
  
})
