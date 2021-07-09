/*
 * @Author: mango
 * @Date: 2020-11-30 15:37:53
 * @LastEditTime: 2021-07-09 15:43:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\uitls\request.js
 */
// 导入axios
import axios from 'axios';
// 使用element-ui Message做消息提醒
import { Message } from 'element-ui';

//1. 创建新的axios实例，
const http = axios.create({
  // 公共接口--这里注意后面会讲
  //   baseURL: process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000,
});
// 2.请求拦截器
http.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8', //配置请求头
      'Access-Control-Allow-Origin': '*',
      token: 'XXXX',
    };
    // config.url = `${BASE_URL}${config.url}`;
    config.url = `${config.url}`;
    console.log(config, 'config-------config.body');
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
http.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    console.error(response, '请求返回=------------------');

    if (response.data.code === 200) {
      return Promise.resolve(response.data.data);
    }
    Message.error(response.data.data.msg);
    return Promise.reject();
  },
  // 网络错误提示
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          //   window.location.href = '/NotFound';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        Message.error('服务器响应超时，请刷新当前页');
      }
      error.message('连接服务器失败');
    }

    Message.error(error.message);
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  }
);
//4.导入文件
export default http;
