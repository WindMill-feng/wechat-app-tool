// pages/content/content.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    //标题
    Title: '',
  },

  /**
   * 生命周期函数--监听页面加载+
   */
  onLoad: function (options) {

    var that = this;
    // 获取传参
    if (options != null) {
      if (app.globalData.wztype=='0'){
        
        var article = app.globalData.data[options.index].content;
        console.log(article);
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          Title: app.globalData.data[options.index].title,
        });
        wx.setNavigationBarTitle({
          title: app.globalData.data[options.index].title,
        })
      }else{
        console.log(app.globalData.wxlist)
        var article = app.globalData.wxlist[options.index].content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          Title: app.globalData.wxlist[options.index].title,
        });
        wx.setNavigationBarTitle({
          title: app.globalData.wxlist[options.index].title,
        })
      }
      
      //console.log('options不为空')
    } else {

      //console.log('options为空')
    }
  

    
  },
  return:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onShareAppMessage: function (id) {
    var that =this;
    return {
      title: that.data.Title
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }


  
 


  
});