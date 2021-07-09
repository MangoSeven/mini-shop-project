/*
 * @Author: mango
 * @Date: 2021-05-24 10:28:49
 * @LastEditTime: 2021-06-09 17:26:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\user_controller.js
 */
const { ObjectId } = require('bson');
const mongo = require('../mongo.js');
const MYDATA = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_USER = 'User';

const AddUser = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const user = database.collection(MYCOLLECTION_USER);
    const firstOne = ctx.request.body;
    const isFind = await user.findOne({ name: firstOne.name });
    if (isFind) {
      ctx.status = 200;
      ctx.body = {
        code: 201,
        data: {
          msg: '用户名重复',
        },
      };
      return;
    }
    await user.insertOne({ ...firstOne, password: '123456' });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
const UserList = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const user = database.collection(MYCOLLECTION_USER);
    const list = await user.find({}).toArray();
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: list,
    };
  });
};
const EditUser = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const user = database.collection(MYCOLLECTION_USER);
    ctx.request.body._id = ObjectId(ctx.request.body['_id']);
    await user.updateOne(
      { _id: ctx.request.body._id },
      { $set: ctx.request.body }
    );
    const result = await user.findOne({ _id: ctx.request.body._id });
    console.log('list', result);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: result,
    };
  });
};
const DeteleUser = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const user = database.collection(MYCOLLECTION_USER);
    ctx.request.body._id = ObjectId(ctx.request.body['_id']);
    await user.deleteOne({ _id: ctx.request.body._id });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
module.exports = {
  AddUser,
  UserList,
  EditUser,
  DeteleUser,
};
