import { http } from '../../utils/http';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerImgs: [],
    typeList: [],
    productRecommend: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http('homeInfo').then((res) => {
      this.setData({
        bannerImgs: res.bannerData,
      });
      this.setData({
        typeList: res.typeData,
      });
      this.setData({
        productRecommend: res.TypeProductRecommendData,
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  goDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    });
  },

  classify(event) {
    const { type_name, _id } = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../classify/classify?type_name=${type_name}&_id=${_id}`,
    });
  },
});
