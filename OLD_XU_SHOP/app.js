App({
  onLaunch(option) {
    console.log(option, "这是一个-----");
    wx.getShareInfo({
      shareTicket: option.shareTicket,
      success(e) {
        console.log(e, "这是成功了");
      },
      fail(e) {
        console.log(e, "这是失败了");
      }
    });
  }
});
