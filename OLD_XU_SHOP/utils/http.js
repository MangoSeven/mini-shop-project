const http = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://你的IP:5000/web/${url}`,
      method: 'POST',
      data: data,
      success: (res) => {
        console.log(res, '成功');
        resolve(res.data.data);
      },
      fail: (res) => {
        console.log(res, '=======失败');
        reject(res);
      },
    });
  });
};
module.exports = {
  http,
};
