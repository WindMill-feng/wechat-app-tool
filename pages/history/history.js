//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
//index.js
Page({
  data: {
    //日历选择
    multiArray: [],
    //日历底标
    multiIndex: [0, 0],
    //历史数据
    datas: '',
    //月份
    months: [],
    //天数31
    days: [],
    //天数30
    day: [],
    //天数 28
    dday: [],
    //显示日历
    showtext: '',
    //天气数据
    weatherinfor: '',
    //展示天氣信息
    msgList: '',

    weatherinfor:'',

  },
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function () {
    this.setData({
      showtext:util.formatTime()[0] + '年' + util.formatTime()[1] + '月' + util.formatTime()[2] + '日' ,
    })
    //获取历史信息
    this.getinfor(util.formatTime()[1], util.formatTime()[2])
   
    



  },
  onReady: function () {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      months: this.data.months,
      days: this.data.days,
      day: this.data.day,
      dday: this.data.dday
    };
    data.months = util.getnum(0),
      data.days = util.getnum(1),
      data.day = util.getnum(2),
      data.dday = util.getnum(3),
      data.multiArray[0] = data.months;
    data.multiArray[1] = data.days;

    this.setData(data);

  },

  //提交日期
  bindMultiPickerChange: function (e) {

    var month = e.detail.value[0] + 1
    var day = e.detail.value[1] + 1
    
    this.setData({
      multiIndex: e.detail.value,
      showtext:util.formatTime()[0] + '年' + month + '月' + day + '日'
    })
    this.getinfor(month, day)

    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 1000
    })
  },
  //日期选择
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0] + 1) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            data.multiArray[1] = this.data.days;
            break;
          case 2:
            data.multiArray[1] = this.data.dday;
            break;
          case 4:
          case 6:
          case 9:
            data.multiArray[1] = this.data.day;
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },

  //点击某个列表跳转，页面传参
  showDetail: function (e) {
    var that = this;
    app.globalData.wztype = '0';
    // 跳转到详情页
    wx.navigateTo ({
      url: '../content/content?index=' + e.currentTarget.dataset.index
    });
  },

  /**
   * 获取信息
   */
  getinfor: function (month, day) {
    var that = this;
    wx.request({
      url: 'https://www.fengche.ltd/test02.php', 
      data: {
        appkey:'',//自己的key
        month: month,
        day: day
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
           datas: res.data.result
        })
        app.globalData.data = res.data.result;
        console.log(that.data.datas);
      }
    })

  },
  onShareAppMessage: function () {

  }
  



})
