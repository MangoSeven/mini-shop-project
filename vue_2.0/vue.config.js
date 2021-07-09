/*
 * @Author: xumingyue
 * @Date: 2021-05-23 17:42:30
 * @LastEditTime: 2021-05-23 18:30:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\vue.config.js
 */
//模块导出
module.exports = {
  //开发服务器配置
  devServer: {
    port: 3030, //端口号，如果端口号被占用，会自动提升1
    https: false, //协议
    open: true, //启动服务时自动开启浏览器访问
    proxy: {
      '/management-system': {
        target: 'http://localhost:5000', // 要访问的接口域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/management-system': '', //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
    },
  },
};
