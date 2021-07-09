/*
 * @Author: mango
 * @Date: 2021-06-09 16:58:43
 * @LastEditTime: 2021-07-09 14:24:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\controller\banner_controller.js
 */
var fs = require('fs');
const { GridFSBucket, ObjectId } = require('mongodb');

const mongo = require('../mongo.js');
const { GridFSBucketReadStreamToBase64 } = require('../utils/index.js');

const MYDATA = 'MANAGEMENT_BUCKET';
const MYCOLLECTION = 'Bucket';

const MYDATA_SYSTEM = 'MANAGEMENT_SYSTEM';
const MYCOLLECTION_Banner = 'Banner';
// 添加图片信息
const AddBannerImgInfo = async (ctx, item) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const banner = database.collection(MYCOLLECTION_Banner);
    await banner.insertOne({ ...item });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {},
    };
  });
};
// 删除图片
const BannerDelete = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const banner = database.collection(MYCOLLECTION_Banner);
    const id = ObjectId(ctx.request.body['id']);
    console.log(ctx.request.body._id);
    // 删除数据库中保存的名字
    await banner.deleteOne({ _id: id });
    // 连接文件流数据库
    const database1 = client.db(MYDATA);
    database1.collection(MYCOLLECTION);
    const bucket = new GridFSBucket(database1);
    // 删除对应文件流
    await bucket.delete(id);
    await BannerList(ctx);
  });
};
// 文件上传至数据库
const UploadFiles = async (ctx) => {
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    database.collection(MYCOLLECTION);

    const bucket = new GridFSBucket(database);

    const { path, name } = ctx.request.files.files;
    const { type } = ctx.request.body;
    const { id, filename } = fs
      .createReadStream(path)
      .pipe(bucket.openUploadStream(name))
      .on('error', function (error) {
        console.log(error);
      })
      .on('finish', async function (e) {
        console.log('上传成功!------');
        switch (type) {
          case 'banner':
            await AddBannerImgInfo(ctx, e);
            break;
          default:
            break;
        }
      });
    // 因为异步该处无效
    // await BannerList(ctx);

    // 不应该在这个位置 FIXME
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {
        id,
        filename,
      },
    };
  }, false);
};
// 查询banner图片信息
const findBannerInfoList = async (ctx) => {
  return await mongo(async (client) => {
    const database = client.db(MYDATA_SYSTEM);
    const banner = database.collection(MYCOLLECTION_Banner);
    const result = await banner.find({}).toArray();
    return result;
  });
};

// 获取banner图片
const BannerList = async (ctx) => {
  const bannerIdList = await findBannerInfoList(ctx);
  await mongo(async (client) => {
    const database = client.db(MYDATA);
    database.collection(MYCOLLECTION);
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
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: bannerList,
    };
  });
};
module.exports = {
  UploadFiles,
  BannerList,
  BannerDelete,
};
