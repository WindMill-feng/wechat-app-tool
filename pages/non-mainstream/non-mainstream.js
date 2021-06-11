// pages/non-mainstream/non-mainstream.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showText:'',
    changeText:'',
    inputText:''
  },
  //第一个文本框的内容
  convertText:function(e){
  
      this.setData({
        changeText:e.detail.value
      });
      console.log(this.data.changeText);
  },
  //简转火
  Chinese:function(){
      var that = this;
      let Text = this.data.changeText;
      console.log(Text);
     if(Text ==''){
        wx.showToast({
          title: '内容为空',
          icon:'error'
        })
     }
      wx.request({
        url:'https://api.jisuapi.com/fontconvert/convert',
        data:{
          appkey:'',//自己的key
          content:Text,
          type:'2h'
        },
        header:{
          'content-type':'application/json'
        },
        success(res){
          console.log(res);
          console.log(res.data.result);

          that.setData({
            showText:res.data.result.rcontent
          });
        }
          
        
      })
  },
  //火转简
  nonMainstream:function(){
    var that = this;
    let Text = this.data.changeText;
    if(Text ==''){
      wx.showToast({
        title: '内容为空',
        icon:'error'
      })
   }
    wx.request({
      url:'https://www.fengche.ltd/non-mainstream.php',
      data:{
        appkey:'',//自己的key
        content:Text,
        type:'2s'
      },
      header:{
        'content-type':'application/json'
      },
      success(res){

        console.log(res.data.result);
        that.setData({
          showText:res.data.result.rcontent
        });
      }
    })
  },
  reset:function(){
    this.setData({
      inputText:''
    })
  },
  copy:function(){
    var that= this;

    wx.setClipboardData({
      data: that.data.showText,
      success(res){
        wx.getClipboardData({
          success(res){
            console.log(res);
          }
        })
      }
    })
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