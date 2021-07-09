/*
 * @Author: mango
 * @Date: 2021-06-09 17:09:54
 * @LastEditTime: 2021-06-09 17:40:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\utils\index.js
 */

const { ObjectId } = require('bson');

/**
 *
 * @param {*} bucket 文件流集合
 * @param {*} fileId 文件ID
 * @returns
 */
const GridFSBucketReadStreamToBase64 = async function (bucket, fileId) {
  return new Promise(async function (resolve, reject) {
    await bucket.openDownloadStream(ObjectId(fileId)).on('data', (data) => {
      // base64可以获得
      let base64Img = 'data:image/png;base64,' + data.toString('base64');
      resolve(base64Img);
    });
  });
};
module.exports = { GridFSBucketReadStreamToBase64 };
