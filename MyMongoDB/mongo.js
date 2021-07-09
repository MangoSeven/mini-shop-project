/*
 * @Author: mango
 * @Date: 2021-05-26 11:35:24
 * @LastEditTime: 2021-07-09 14:26:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\mongo.js
 */
const { MongoClient } = require('mongodb');
const URL = 'mongodb://127.0.0.1:27017'; // 默认地址

async function mongo(callback, isAutoClose = true) {
  const client = new MongoClient(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  });
  try {
    await client.connect();
    const result = await callback(client);
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (isAutoClose) {
      console.log('关闭-==---------------');
      await client.close();
    }
  }
}

module.exports = mongo;
