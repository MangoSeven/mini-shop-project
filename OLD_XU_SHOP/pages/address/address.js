// map.js
Page({
  data: {

    markers: [{
      // iconPath: "./huge.jpeg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      title: "芒果的店",
    }],
    controls: [{
      id: 1,
      iconPath: './huge.jpeg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude: 23,
          longitude: 110,
          name: "长沙",
          scale: 16
        })
      }
    }) 
  },
  onLoad () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
      }
    }) 
  }
}) 