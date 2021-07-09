/*
 * @Author: mango
 * @Date: 2021-05-19 15:34:02
 * @LastEditTime: 2021-07-09 14:27:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\index.js
 */

const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');

const app = new Koa();
// // 文件上传，注意书写的位置很重要，否则无法上传
app.use(koaBody({ multipart: true }));
app.use(bodyParser()); // 解析request的body

const myRouters = require('./routes');

// 处理跨域的配置
app.use(
  cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Custom-Header',
      'anonymous',
    ],
  })
);

app.use(myRouters.routes()).use(myRouters.allowedMethods());
app.listen(5000); // 改成你需要的端口号
console.log('监听端口 5000...');
