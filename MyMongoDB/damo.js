/*
 * @Author: mango
 * @Date: 2021-05-20 10:34:21
 * @LastEditTime: 2021-06-09 18:07:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\mongod.js
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const router = require('koa-router')();

const app = new Koa();

// // 文件上传，注意书写的位置很重要，否则无法上传
app.use(koaBody({ multipart: true }));
app.use(bodyParser()); // 解析request的body
const { MongoClient, GridFSBucket, Mongos, ObjectId } = require('mongodb');

var fs = require('fs');
const assert = require('assert');
const URL = 'mongodb://127.0.0.1:27017';
const MYDATA = 'MANAGEMENT_BUCKET';
const MYCOLLECTION = 'Bucket';
const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
});
async function run(body) {
  try {
    await client.connect();
    const database = client.db(MYDATA);
    database.collection(MYCOLLECTION);
    const bucket = new GridFSBucket(database);
    console.log('db===============', bucket);
    fs.createReadStream(body)
      .pipe(bucket.openUploadStream(body))
      .on('error', function (error) {
        assert.ifError(error);
      })
      .on('finish', function (e) {
        console.log('done!------', e);
        // process.exit(0);
      });

    // bucket
    //   .openDownloadStreamByName('111.png')
    //   .pipe(fs.createWriteStream('./output.png'))
    //   .on('error', function (error) {
    //     assert.ifError(error);
    //   })
    //   .on('finish', function (e) {
    //     console.log('done!', e);
    //     // process.exit(0);
    //   });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// 文件上传至数据库
router.post('/file/uploadFiles', async (ctx) => {
  await client.connect();
  const database = client.db(MYDATA);
  database.collection(MYCOLLECTION);
  const bucket = new GridFSBucket(database);
  const { path, name } = ctx.request.files.files;
  console.log(ctx.request.files.files, '====================');
  fs.createReadStream(path)
    .pipe(bucket.openUploadStream(name))
    .on('error', function (error) {
      assert.ifError(error);
    })
    .on('finish', function (e) {
      console.log('done!------', e);
    });
});

async function GridFSBucketReadStreamToBase64(bucket, fileId) {
  return new Promise(async function (resolve, reject) {
    await bucket.openDownloadStream(ObjectId(fileId)).on('data', (data) => {
      // base64可以获得
      let base64Img = 'data:image/png;base64,' + data.toString('base64');
      resolve(base64Img);
    });
  });
}
router.post('/file/downloadFiles/banner', async (ctx) => {
  await client.connect();
  const database = client.db(MYDATA);
  database.collection(MYCOLLECTION);
  const bucket = new GridFSBucket(database);

  let base64 = await GridFSBucketReadStreamToBase64(
    bucket,
    '60b9e00b8e889c2ac0a862db'
  );
  let a = [];
  for (let i = 0; i < 5; i++) {
    console.log('come');
    a.push(base64);
  }
  console.log(ctx.status, 'ctx.stauts=先执行', a.length);

  ctx.status = 200;
  ctx.body = {
    code: 200,
    data: a,
  };
});

// run().catch(console.dir);

// async function myInsterMany() {
//   try {
//     await client.connect();
//     const database = client.db('mingming');
//     const movies = database.collection('site1');
//     const query = { name: 'Infinite Jest' };
//     const sort = { name: 1 };
//     const projection = { name: 1 };

//     const cursor = movies.find(query).sort(sort).project(projection);
//     // console.log(cursor);
//     for await (let item of cursor) {
//       console.log(item);
//     }
//   } finally {
//     await client.close();
//   }
// }
// myInsterMany().catch(console.dir);

// const dbName = 'myproject';
// const client = new MongoClient(url, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// const insertDocuments = function (db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany(
//     [{ a: 8 }, { a: 9 }, { a: 10 }],
//     function (err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log('Inserted 3 documents into the collection', result);
//       callback(result);
//     }
//   );
// };
// const findDocuments = function (db, callback) {
//   const collection = db.collection('documents');
//   collection.find({ a: 3 }).toArray(function (err, docs) {
//     assert.equal(err, null);
//     console.log('Found the following records');
//     console.log(docs);
//     callback(docs);
//   });
// };
// const updateDocument = function (db, callback) {
//   const collection = db.collection('documents');
//   collection.updateOne(
//     { a: 9 },
//     { $set: { b: 'hei99999' } },
//     function (err, result) {
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       console.log('Updated the document with the field a equal to 2');
//       callback(result);
//     }
//   );
// };

// const removeDocument = function (db, callback) {
//   const collection = db.collection('documents');
//   collection.deleteOne({ a: 8 }, function (err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log('Removed the document with the fieid a equal to 8');
//     callback(result);
//   });
// };

// const indexCollection = function (db, callback) {
//   db.collection('documents').createIndex(
//     { a: 1 },
//     null,
//     function (err, result) {
//       console.log(result, 'what is this?');
//       callback();
//     }
//   );
// };

// client.connect(function (err) {
//   console.error(err, '------------');
//   //   assert.equal(null, err);
//   console.log('建立连接成功');
//   const db = client.db(dbName);
//   //   insertDocuments(db, function () {
//   //     client.close();
//   //   });
//   //   findDocuments(db, function () {
//   //     client.close();
//   //   });
//   //   updateDocument(db, function () {
//   //     client.close();
//   //   });
//   //   insertDocuments(db, function () {
//   //     updateDocument(db, function () {
//   //       client.close();
//   //     });
//   //   });
//   //   removeDocument(db, function () {
//   //     client.close();
//   //   });

//   //   insertDocuments(db, function () {
//   //     updateDocument(db, function () {
//   //       removeDocument(db, function () {
//   //         client.close();
//   //       });
//   //     });
//   //   });

//   insertDocuments(db, function () {
//     indexCollection(db, function () {
//       client.close();
//     });
//   });
// });
app.use(router.routes());
app.listen(5000);
console.log('app started at port 5000...');
