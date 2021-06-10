//获取当前时间
function formatTime() {
  var date = new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year,month, day]
}
//获取月 日
function getnum(num){
  var data=[];
  switch(num){
    case 0:
      for (let n = 1; n <= 12; n++) {
     //   n = n.toString()[1] ? n : '0' + n
        data.push(n + '月')
      }
    break;
    case 1:
      for (let n = 1; n <= 31; n++) {
        data.push(n + '日')
      }
    break;
    case 2:
      for (let n = 1; n <= 30; n++) {
        data.push(n + '日')
      }

    default:
      for (let n = 1; n <= 28; n++) {
        data.push(n + '日')
      }
      break
    break;
  }
  return data;
};
//请求方法
const requestAjax = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'get',
        url: url,
        data: data,
        header: {
          "content-type": "application/json"
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'post',
        url: url,
        data: data,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}


//将方法暴露出来
module.exports = {
  formatTime: formatTime,
  getnum:getnum,
  requestAjax
}

