/*
 * @Author: mango
 * @Date: 2021-05-23 16:09:15
 * @LastEditTime: 2021-05-27 14:50:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller.js
 */
const mongo = require('../mongo.js');
const MYDATA = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_LOGIN = 'User';
const Login = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const user = database.collection(MYCOLLECTION_LOGIN);
    const firstOne = ctx.request.body;
    const result = await user.find(firstOne).toArray();
    ctx.status = 200;
    // 登录成功
    if (result.length) {
      ctx.body = {
        code: 200,
        data: result[0],
      };
      return;
    }
    // 账号密码错误
    ctx.body = {
      code: 201,
      data: {
        msg: '账号或密码错误',
      },
    };
    return;
  });
};
module.exports = {
  Login,
};
