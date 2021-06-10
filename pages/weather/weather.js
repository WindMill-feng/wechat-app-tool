const app = getApp();
let globalData = app.globalData;
const APIKEY = "";//自己的key
const jinrishici = require('../../utils/jinrishici.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jinrishici:'',
    hideNotice: false,
    notice:'',
    firstgetlocation:true,
    background:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  init() {
    if (app.globalData.cityId) {
      this.setData({
        [location]: app.globalData.location,
        cityName: app.globalData.cityName
      })
    }
    jinrishici.load(result => {
      this.setData({"jinrishici": result.data.content})
    })
    this.getLocation()
  },
  onLoad: function (options) {

    this.init();
  },
  searchregion(){
    wx.navigateTo({
      url: '/pages/city/city',
    })

  },
  /**
   * 获取定位
   */
  getLocation() {
    var that = this
    
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res);
        console.log(that.data.firstgetlocation);
        if(that.data.firstgetlocation == true){
          that.setData({
            location: res.longitude + "," + res.latitude,
            firstgetlocation:false
          })
          globalData.location = that.data.location;
        }
        that.getWeather()
        that.getCityByLoaction()
      }, fail(err) {
                  wx.getSetting({
                    success(res) {
                      if (!res.authSetting['scope.userLocation']) {
                        wx.authorize({
                          scope: 'scope.userLocation',
                          success () {
                            wx.getLocation()
                            if (data.authSetting["scope.userLocation"] === true) {
                              wx.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 1000
                              })
                              that.getLocation()
                              that.getWeather()
                              that.getCityByLoaction()
                            }
                          }
                        })
                      }      
                    }
                  })
      }
    })
  },
  /**
   * 根据坐标获取城市信息
   */
  getCityByLoaction() {
    var that = this
    console.log(globalData.location);
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?key=' + APIKEY + "&location=" + globalData.location,
      success(result) {
        var res = result.data
        if (res.code == "200") {
          var data = res.location[0]
          that.setData({
            City: data.adm2,
            County: data.name
          })
        } else {
          wx.showToast({
            title: '获取城市信息失败',
            icon: 'none'
          })
        }

      }
    })
  },
  /**
   * 获取天气
   */
  getWeather() {
    var that = this
    that.setData({
      background:'https://tu.ltyuanfang.cn/api/fengjing.php'
    })
    wx.showLoading({
      title: '加载中',
    })
    
    console.log(globalData.location);
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?key=' + APIKEY + "&location=" + globalData.location,
      success(result) {
        var res = result.data
        that.setData({
          now: res.now
        })
      }
    })
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/24h?key=' + APIKEY + "&location=" + globalData.location,
      success(result) {
        var res = result.data
        //console.log(res)
        res.hourly.forEach(function (item) {
          item.time = that.formatTime(new Date(item.fxTime)).hourly
        })
        that.setData({
          hourly: res.hourly
        })
      }
    })
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/7d?key=' + APIKEY + "&location=" + globalData.location,
      success(result) {
        // console.log(result);
        var res = result.data
        console.log(res)
        res.daily.forEach(function (item) {
          item.date = that.formatTime(new Date(item.fxDate)).daily
          item.dateToString = that.formatTime(new Date(item.fxDate)).dailyToString
        })
        that.setData({
          daily: res.daily
        })
        wx.hideLoading()
      }
    })
    wx.request({
      url: "https://free-api.heweather.net/s6/weather",
      data:{
        key:APIKEY,
        location:globalData.location
      },
      success(res){
        console.log(res);
        var num =7;

        if(that.data.notice ==''){
          for(let i =0;i<num;i++){
            that.setData({
              notice :that.data.notice += res.data.HeWeather6[0].lifestyle[i].txt
            })
          }
        }else if(that.data.notice !=''){
          that.setData({
            notice:''
          })

          for(let i =0;i<num;i++){
            that.setData({
              notice :that.data.notice += res.data.HeWeather6[0].lifestyle[i].txt
            })
          }
        }
        console.log(that.data.notice);
      }
    })
  },
  // 格式时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    const isToday = date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
    return {
      hourly: [hour, minute].map(this.formatNumber).join(":"),
      daily: [month, day].map(this.formatNumber).join("-"),
      dailyToString: isToday ? "今天" : weekArray[date.getDay()]
    }
  },
  // 补零
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
