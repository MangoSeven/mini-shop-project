/*
 * @Author: your name
 * @Date: 2021-06-24 14:10:01
 * @LastEditTime: 2021-07-09 17:12:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\h5_type_product_list_controller.js
 */
const { GridFSBucket } = require('mongodb');

const mongo = require('../mongo.js');
const { GridFSBucketReadStreamToBase64 } = require('../utils/index.js');

const MYDATA_BUCKET = 'MANAGEMENT_BUCKET';
const MYCOLLECTION_BUCKET = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_INFO = 'Product_Info';

// 获取产品第一个头部图片
const FirstHeadImg = async (ctx, imgId) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_BUCKET);
    database.collection(MYCOLLECTION_BUCKET);
    const bucket = new GridFSBucket(database);
    const base64 = await GridFSBucketReadStreamToBase64(bucket, imgId);
    return base64;
  });
};
// 类型产品推荐
const TypeProductRecommend = async (ctx, typeData) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    let TypeProductRecommendData = [];
    let promiseArr, promiseArr1;
    promiseArr = typeData.map(async (item) => {
      const id = item._id ? item._id.toString() : item.id.toString();
      console.log(id, '====================id');

      let list = await product_info.find({ 'type._id': id }).toArray();

      promiseArr1 = list.map(async (item, index) => {
        const imgUrl = item.headImgs[0]
          ? await FirstHeadImg(ctx, item.headImgs[0].id)
          : '';
        list[index].imgUrl = imgUrl;
      });
      await Promise.all([...promiseArr1]);
      TypeProductRecommendData.push({
        type: item,
        list: list,
      });
    });
    await Promise.all([...promiseArr]);
    return TypeProductRecommendData;
  });
};
const TypeProductList = async (ctx) => {
  const TypeProductRecommendData = await TypeProductRecommend(ctx, [
    ctx.request.body,
  ]);

  await mongo(async () => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: TypeProductRecommendData[0],
    };
  });
};
module.exports = {
  TypeProductList,
};
