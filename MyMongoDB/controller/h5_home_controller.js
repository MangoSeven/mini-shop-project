/*
 * @Author: your name
 * @Date: 2021-06-23 11:49:28
 * @LastEditTime: 2021-07-09 16:19:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\h5_home_controller.js
 */
const { GridFSBucket } = require('mongodb');
const mongo = require('../mongo.js');
const { GridFSBucketReadStreamToBase64 } = require('../utils/index.js');
const MYDATA_BUCKET = 'MANAGEMENT_BUCKET';
const MYCOLLECTION_BUCKET = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_PRODUCT_TYPES = 'Product_Types';
const MYCOLLECTION_BANNER = 'Banner';
const MYCOLLECTION_PRODUCT_INFO = 'Product_Info';

// 查询banner图片信息
const findBannerInfoList = async (ctx) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const banner = database.collection(MYCOLLECTION_BANNER);
    const result = await banner.find({}).toArray();
    return result;
  });
};
// 获取banner图片
const BannerList = async (ctx) => {
  const bannerIdList = await findBannerInfoList(ctx);
  return await mongo(async (client) => {
    const database = client.db(MYDATA_BUCKET);
    database.collection(MYCOLLECTION_BUCKET);
    const bucket = new GridFSBucket(database);

    let bannerList = [];
    promiseArr = bannerIdList.map(async (item) => {
      const base64 = await GridFSBucketReadStreamToBase64(bucket, item['_id']);
      console.log(base64.length);
      bannerList.push({
        url: base64,
        id: item['_id'],
        filename: item.filename,
      });
    });
    await Promise.all(promiseArr);
    return bannerList;
  });
};
const TypeList = async (ctx) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_type = database.collection(MYCOLLECTION_PRODUCT_TYPES);
    const list = await product_type.find({}).toArray();
    return list;
  });
};
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
// 类型产品推荐(截取前6个)
const TypeProductRecommend = async (ctx, typeData) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const product_info = database.collection(MYCOLLECTION_PRODUCT_INFO);
    let TypeProductRecommendData = [];
    let promiseArr;
    promiseArr = typeData.map(async (item) => {
      const id = item._id.toString();
      let list = await product_info.find({ 'type._id': id }).toArray();

      promiseArr1 = list.map(async (item, index) => {
        console.log(item, '----------------------item');
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
const Home = async (ctx) => {
  await mongo(async () => {
    const bannerData = await BannerList(ctx);
    const typeData = await TypeList(ctx);
    const TypeProductRecommendData = await TypeProductRecommend(ctx, typeData);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: { bannerData, typeData, TypeProductRecommendData },
    };
  });
};
module.exports = {
  Home,
};
