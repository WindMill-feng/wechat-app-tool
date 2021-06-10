// pages/city/city.js
const app = getApp();
let globalData = app.globalData;
const APIKEY = "";//填自己的key
let utils = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //城市参数
    cityParams: {
      key: '',
      location: '',
      range: 'world',
      number: 20, 
    },
    likeCityList: [], 
    cityList: [], 
    location: '', 
    isShow: false, 
    searchlocation:''
  },

  //获取喜欢的城市列表
  getLikeCityList() {
    let likeCityList = [{
      location:'116.40528'+','+'39.90498',
      name: '北京市'
      },
      {
        location:'113.28063'+','+'23.12517',
        name: '广州市'
      },
      {
        location:'121.47264'+','+'31.23170',
        name: '上海市'
      },
      {
        location:'114.08594'+','+'22.54700',
        name: '深圳市'
      },
      {
        location:'120.15357'+','+'30.28745',
        name: '杭州市'
      },
      {
        location:'114.29856'+','+'30.58435',
        name: '武汉市'
      },
      {
        location:'112.98227'+','+'28.19408',
        name: '长沙市'
      },
      {
        location:'106.55046'+','+'29.56376',
        name: '重庆市'
      },
      {
        location:'108.32000'+','+'22.82402',
        name: '南宁市'
      }
    ];
    this.setData({
      likeCityList: likeCityList
    })
  },

  //搜索城市
  bindConfirm() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this,
      params = that.data.cityParams,
     
      obj = {
        key: APIKEY,
        location: that.data.location,
      };
    Object.assign(params, obj);
    utils.requestAjax.get('https://geoapi.qweather.com/v2/city/lookup', params)
      .then((res) => {
        wx.hideLoading();
        if (res.data.code != 200) {
          that.setData({
            cityList: [],
            isShow: true,
          })
          return
        }
        console.log(res);
        that.setData({
          cityList: res.data.location,
          isShow: true,
        })
      })
  },

  //键盘输入监听
  bindInput(e) {
    let that = this;
    var value = e.detail.value;
    console.log(value);
    if (!value) {
      that.setData({
        cityList: [],
        isShow: false,
      })
      return
    }
    that.setData({
      location: value
    })
  },

  //点击选择城市
  bindChoose(e) {
    let location = e.currentTarget.dataset.location,
      name = e.currentTarget.dataset.name;
    globalData.location = location;
    globalData.cityName = name;
    console.log(e);
    wx.switchTab({
      url: '/pages/weather/weather',
      success(res) {
        let page = getCurrentPages().pop();
        if (page == undefined || page == null) {
          return
        }
        page.onLoad();
      }
    })
  },

  //重置值
  resetValues() {
    this.setData({
      cityList: [],
      location: '',
      isShow: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLikeCityList();
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.resetValues();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.resetValues();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})