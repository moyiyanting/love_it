// pages/community/index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ['小贴士','宠物训练','宠物知识','配种'], // 标签页标题数组
    activeIndex: 0, // 当前选中的标签页索引
    sliderOffset: 0, // 指示条的平移距离
    sliderLeft: 0, // 指示条的left值
    community:[],
    com0:[],
    com1:[],
    com2:[],
    com3:[],
  },
  
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    const db = wx.cloud.database()
    db.collection('community').orderBy('time','desc').get({
      success:res=> {
        console.log(res.data)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        this.setData({
          //将从云端获取的数据放到testList中
          community:res.data,
        })
      },
      fail: console.error
    })
    db.collection('fabu')
    .where({
      g_type:'小贴士'
    }).get({
      success:res=> {
        console.log(res.data)
        console.log('获取分类成功',res)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        this.setData({
          //将从云端获取的数据放到testList中
          com0:res.data,
        })
      },
      fail: console.error
    })
    db.collection('community').orderBy('time','desc')
    .where({
      pub_type:'宠物训练'
    }).get({
      success:res=> {
        console.log(res.data)
        console.log('获取分类成功',res)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        this.setData({
          //将从云端获取的数据放到testList中
          com1:res.data,
        })
      },
      fail: console.error
    })
    db.collection('community').orderBy('time','desc')
    .where({
      pub_type:'宠物知识'
    }).get({
      success:res=> {
        console.log(res.data)
        console.log('获取分类成功',res)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        this.setData({
          //将从云端获取的数据放到testList中
          com2:res.data,
        })
      },
      fail: console.error
    })
    db.collection('community').orderBy('time','desc')
    .where({
      pub_type:'配种'
    }).get({
      success:res=> {
        console.log(res.data)
        console.log('获取分类成功',res)
        for(var a=0; a< res.data.length; a++)
        {
          res.data[a].time=res.data[a].time.toLocaleString();
        }
        this.setData({
          //将从云端获取的数据放到testList中
          com3:res.data,
        })
      },
      fail: console.error
    })
  },


  hideInput: function(){
    wx.setStorageSync('searchData',[])
      this.setData({
        modalHidden:true
      })
      wx.redirectTo({
        url: '../search/search'
      }) 
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  tabClick: function (e) {
    let that = this
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },





  //搜索方法 key为用户输入的查询字段
 search: function (key) {
  /*console.log('搜索函数触发')*/
  var that = this;
  var community = wx.getStorage({
   key: 'community',
   success: function (res) {//从storage中取出存储的数据*/
   /*console.log(res)*/
    if (key == '') {//用户没有输入 全部显示
     that.setData({
      community: res.data
     })
     return;
    }
    var arr = [];//临时数组 用于存放匹配到的数据
    for (let i in res.data) {
     if (res.data[i].title.indexOf(key) >= 0) {//查找
      arr.push(res.data[i])
     }
    }
    if (arr.length == 0) {
     that.setData({
      community:[]
     })
    } else {
     that.setData({
      community: arr//在页面显示找到的数据
     })
    }
   }
  })
  },
//搜素时触发，调用search: function (key)，传入输入的e.detail.value值
  wxSearchInput: function (e) {
  this.search(e.detail.value);
  },
  get_type:function(e){
    let that = this
    that.setData({
      tabs_now:e.currentTarget.dataset.pub_type
    })
    that.get_pub
  },
  get_pub:function(){
    let that = this
    db.collection('community')
    .where({
      pub_type:that.data.tabs_now
    }).get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          com0:res.data
        })
      },
      fail:function(res){
        console.log('获取分类失败',res)
      }
    })
  },
})