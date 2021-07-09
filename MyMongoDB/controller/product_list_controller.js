/*
 * @Author: your name
 * @Date: 2021-06-22 14:55:10
 * @LastEditTime: 2021-06-22 16:34:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\product_list_controller.js
 */

const { GridFSBucket, ObjectId } = require('mongodb');

const mongo = require('../mongo.js');

const MYDATA = 'MANAGEMENT_BUCKET';
const MYCOLLECTION = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_INFO = 'Product_Info';

// 删除图片
const DeleteImg = async (ctx, imgId) => {
  if (!imgId) {
    return;
  }
  await mongo(async (client) => {
    const id = ObjectId(imgId);
    // 连接文件流数据库
    const database = client.db(MYDATA);
    database.collection(MYCOLLECTION);
    const bucket = new GridFSBucket(database);
    // 删除对应文件流
    await bucket.delete(id);
  });
};
// 删除产品信息
const DeleteProductInfo = async (ctx, imgId) => {
  const { headImgs, detailImgs } = ctx.request.body;
  promiseArr = headImgs.map(async (item) => {
    if (item) {
      await DeleteImg(ctx, item.id);
    }
  });
  promiseArr1 = detailImgs.map(async (item) => {
    if (item) {
      await DeleteImg(ctx, item.id);
    }
  });
  await Promise.all([...promiseArr, ...promiseArr1]);
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    const id = ObjectId(ctx.request.body['_id']);
    // 更新除id外所有内容
    await product_info.deleteOne({ _id: id });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};

// 获取产品详情
const ProductInfoList = async (ctx) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    const result = await product_info.find({}).toArray();
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: result,
    };
  });
};

module.exports = {
  DeleteProductInfo,
  ProductInfoList,
};
