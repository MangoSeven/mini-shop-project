let App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgUrl: 'http://img0.imgtn.bdimg.com/it/u=842588081,365322739&fm=26&gp=0.jpg',//背景图片网络地址
    title: '这是一个canvas',
    qrcodeUrl: 'http://img0.imgtn.bdimg.com/it/u=2755290679,1703424441&fm=26&gp=0.jpg',//二维码图片网络地址
    HandleUrl: 'http://img3.imgtn.bdimg.com/it/u=2892859993,2104495038&fm=26&gp=0.jpg',//手指图片网络地址
  },
  onLoad: function (options) {
    // 生成页面的二维码
    wx.request({
//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
//         url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=AbgEb2z0il9eIsqn6pWJTmSkvTcJhtb1As3_e049Qv_iFnVw8TXKEa2N8nn3GBKJbQaJ9G2ae5At4Cirphd8HFaduGvMU14UpuWjJz6X0i74I8-',
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb9d72eed66869cfb&secret=aaa3cbc19349257a0e319d96fa8fadf7',
      method: 'GET',
      responseType: 'arraybuffer',  //设置响应类型
      success: (res) => {
        console.log(res)
        var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
        console.log(src2)
        this.getCode('22_FQhiJyp-va2hUGT0gIbaygQ8mGZehn51IsywuSgPI69H4DZNM0oK4awJrp5ruQVw0fUXqOptFpQeGyH1DRsXt9V6VOTpcrIGmIZciBjDnedMNp2IL7kg9AF6RfCvj0Gr0E3lo5m7ZCz46CEJCGZaAIAVZS')
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },
  onShareAppMessage() {
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  getCode(token) {
    wx.request({
//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
      url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`,
      // url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb9d72eed66869cfb&secret=aaa3cbc19349257a0e319d96fa8fadf7',
      data: {
        scene: '000',
        page: '/pages/index/index'
      },
      method: "POST",
      responseType: 'arraybuffer',  //设置响应类型
      success(res) {
        console.log(res)
        var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
        console.log(src2)
      },
      fail(e) {
        console.log(e)
      }
    })
  }
})