/*
 * @Author: your name
 * @Date: 2021-06-18 10:16:41
 * @LastEditTime: 2021-06-23 13:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\product_type_controller.js
 */
const { ObjectId } = require('bson');
const mongo = require('../mongo.js');
const MYDATA = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_TYPES = 'Product_Types';

const AddType = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const product_type = database.collection(MYCOLLECTION_PRODUCT_TYPES);
    const { type_name } = ctx.request.body;
    const isFind = await product_type.findOne({ type_name });
    if (isFind) {
      ctx.status = 200;
      ctx.body = {
        code: 201,
        data: {
          msg: '类型重复',
        },
      };
      return;
    }
    await product_type.insertOne({ type_name });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
const TypeList = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const product_type = database.collection(MYCOLLECTION_PRODUCT_TYPES);
    const list = await product_type.find({}).toArray();
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: list,
    };
  });
};
const EditType = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const product_type = database.collection(MYCOLLECTION_PRODUCT_TYPES);
    ctx.request.body._id = ObjectId(ctx.request.body['_id']);
    await product_type.updateOne(
      { _id: ctx.request.body._id },
      { $set: ctx.request.body }
    );
    const result = await product_type.findOne({ _id: ctx.request.body._id });
    console.log('list', result);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: result,
    };
  });
};
const DeteleType = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    const product_type = database.collection(MYCOLLECTION_PRODUCT_TYPES);
    ctx.request.body._id = ObjectId(ctx.request.body['_id']);
    await product_type.deleteOne({ _id: ctx.request.body._id });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
module.exports = {
  AddType,
  TypeList,
  EditType,
  DeteleType,
};
