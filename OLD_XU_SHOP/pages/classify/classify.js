//logs.js
const util = require('../../utils/util.js')
import { http } from "../../utils/http";

Page({
  data: {
    // 毛巾
    productData:[]
  },
  onLoad: function (options) {
    http("typeProduct/list",options).then(res => {
      this.setData({
        productData: res.list,
        type:options
      })
    });

  },
  detail(event) {
    const {id}=event.currentTarget.dataset

    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  }
})
