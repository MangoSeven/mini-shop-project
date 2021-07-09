/*
 * @Author: your name
 * @Date: 2021-06-18 14:46:40
 * @LastEditTime: 2021-07-09 14:25:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\product_detail_controller.js
 */
var fs = require('fs');
const { GridFSBucket, ObjectId } = require('mongodb');

const mongo = require('../mongo.js');
const { GridFSBucketReadStreamToBase64 } = require('../utils/index.js');

const MYDATA = 'MANAGEMENT_BUCKET';
const MYCOLLECTION = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_INFO = 'Product_Info';
const AddProductInfo = async (ctx) => {
  const { body } = ctx.request;
  await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    await product_info.insertOne({ ...body });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
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

// 获取产品详情
const productInfoOriginal = async (ctx) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    const id = ObjectId(ctx.request.body['id'] || ctx.request.body['_id']);
    const result = await product_info.find({ _id: id }).toArray();
    console.log(result[0], '=======================result[0]');
    return result[0];
  });
};

// 获取产品详情图片
const ProductInfoDetail = async (ctx) => {
  const productInfo = await productInfoOriginal(ctx);
  let { headImgs, detailImgs } = productInfo;
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    database.collection(MYCOLLECTION);
    const bucket = new GridFSBucket(database);

    let headImgsList = [];
    promiseArr = headImgs.map(async (item) => {
      if (!item) {
        return;
      }
      const base64 = await GridFSBucketReadStreamToBase64(bucket, item.id);
      headImgsList.push({ url: base64, id: item.id, filename: item.filename });
    });
    let detailImgsList = [];
    promiseArr1 = detailImgs.map(async (item) => {
      if (!item) {
        return;
      }
      const base64 = await GridFSBucketReadStreamToBase64(bucket, item.id);
      detailImgsList.push({
        url: base64,
        id: item.id,
        filename: item.filename,
      });
    });
    await Promise.all([...promiseArr, ...promiseArr1]);
    productInfo.headImgs = headImgsList;
    productInfo.detailImgs = detailImgsList;
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: productInfo,
    };
  });
};
// 筛除旧数据中不包括新数据的数据
const filerImgDiff = (oldArray = [], newArray = []) => {
  const copyOldArray = oldArray;
  if (newArray.length === 0) {
    return oldArray;
  }
  newArray.forEach((item) => {
    oldArray.forEach((jtem, index) => {
      if (item.id === jtem.id) {
        copyOldArray.splice(index, 1);
      }
    });
  });
  return copyOldArray;
};
// 更新详情数据
const UpdataProductInfo = async (ctx) => {
  const productInfo = await productInfoOriginal(ctx);
  const { headImgs, detailImgs } = productInfo;
  const headImgsNew = ctx.request.body.headImgs;
  const detailImgsNew = ctx.request.body.detailImgs;
  const deleteHeadImgs = filerImgDiff(headImgs, headImgsNew);
  const deleteDetailsImgs = filerImgDiff(detailImgs, detailImgsNew);

  promiseArr = deleteHeadImgs.map(async (item) => {
    if (item) {
      await DeleteImg(ctx, item.id);
    }
  });
  promiseArr1 = deleteDetailsImgs.map(async (item) => {
    if (item) {
      await DeleteImg(ctx, item.id);
    }
  });
  await Promise.all([...promiseArr, ...promiseArr1]);
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    const id = ObjectId(ctx.request.body['_id']);
    const copyData = ctx.request.body;
    delete copyData['_id'];
    // 更新除id外所有内容
    await product_info.updateMany({ _id: id }, { $set: { ...copyData } });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
module.exports = {
  AddProductInfo,
  ProductInfoDetail,
  DeleteImg,
  productInfoOriginal,
  UpdataProductInfo,
};
