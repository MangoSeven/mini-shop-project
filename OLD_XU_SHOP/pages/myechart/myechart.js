import * as echarts from '../../component/echarts';

let chart = null;
let index = 0;
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });


  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        show: false,
        name: 'X轴',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666',
          rotate: -45
        },
        inverse: false
      }
    ],
    yAxis: [
      {
        show: true,
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        // name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        // name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        // name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        // data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };
//  chart.on('click', function (params) {
//       // console.log(params);
//     });
  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    index: '呵呵呵'
  },

  onReady() {
    setTimeout( () => {
      // 获取 chart 实例的方式
      console.log(chart);
      // chart.rotate(90 * Math.PI / 180);
      this.changeData();
      wx.createSelectorQuery().select('#mychart-dom-bar').boundingClientRect(function (rect) {
     console.log(rect)
      }).exec()
    }, 2000);
    
  },
  onLoad() {
    // this.changeData();
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle('red');
    ctx.fillRect(10, 10, 150, 75);
    ctx.draw();
  },
  changeData(e) {
    let ones = '';
    chart.on('click', (params) => {

      ones = params.dataIndex;
      console.log(params.dataIndex);
      console.log(params);

      this.setData({
        index: ones
      })
    });
    this.setData({
      index: ones
    });
    console.log(chart.click);
    chart.setOption({
      legend: {
        data: ['热度', '规格', '负面']
      },
      yAxis: [
        {
          show: true,
          type: 'category',
          axisTick: { show: false },
          data: ['1', '3', '5', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ]
    });
    // canvas.setChart(chart);
  },
  getIndex(){
    console.log(3);
  },
  one() {
    console.log(2);
  },
  clickTop() {
    console.log('hh');
  }
});
