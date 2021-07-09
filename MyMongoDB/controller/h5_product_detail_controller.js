/*
 * @Author: your name
 * @Date: 2021-06-24 14:35:17
 * @LastEditTime: 2021-06-24 15:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\h5_product_detail_controller.js
 */
const { GridFSBucket, ObjectId } = require('mongodb');

const mongo = require('../mongo.js');
const { GridFSBucketReadStreamToBase64 } = require('../utils/index.js');

const MYDATA = 'MANAGEMENT_BUCKET';
const MYCOLLECTION = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_INFO = 'Product_Info';

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
const ProductInfoDetailH5 = async (ctx) => {
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

module.exports = {
  ProductInfoDetailH5,
};
