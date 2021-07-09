/*
 * @Author: mango
 * @Date: 2021-05-23 14:29:25
 * @LastEditTime: 2021-06-24 15:06:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MyMongoDB\routes.js
 */

const router = require('koa-router')();
const { Login } = require('./controller/login_controller');
const {
  AddUser,
  UserList,
  EditUser,
  DeteleUser,
} = require('./controller/user_controller');
const {
  AddType,
  TypeList,
  EditType,
  DeteleType,
} = require('./controller/product_type_controller');
const {
  UploadFiles,
  BannerList,
  BannerDelete,
} = require('./controller/banner_controller');
const {
  DeleteImg,
  AddProductInfo,
  ProductInfoDetail,
  UpdataProductInfo,
} = require('./controller/product_detail_controller');
const {
  DeleteProductInfo,
  ProductInfoList,
} = require('./controller/product_list_controller');
const { Home } = require('./controller/h5_home_controller');
const {
  TypeProductList,
} = require('./controller/h5_type_product_list_controller');
const {
  ProductInfoDetailH5,
} = require('./controller/h5_product_detail_controller');
router.post('/login', Login);
router.post('/user/addUser', AddUser);
router.post('/user/userList', UserList);
router.post('/user/editUser', EditUser);
router.post('/user/deteleUser', DeteleUser);
router.post('/type/addType', AddType);
router.post('/type/typeList', TypeList);
router.post('/type/editType', EditType);
router.post('/type/deleteType', DeteleType);
router.post('/file/uploadFiles', UploadFiles);
router.post('/file/downloadFiles/banner/list', BannerList);
router.post('/file/downloadFiles/banner/delete', BannerDelete);
router.post('/file/downloadFiles/delete', DeleteImg);
router.post('/product/info/add', AddProductInfo);
router.post('/product/info/detail', ProductInfoDetail);
router.post('/product/info/updata', UpdataProductInfo);
router.post('/product/info/list', ProductInfoList);
router.post('/product/info/delete', DeleteProductInfo);
// H5接口
router.post('/web/homeInfo', Home);
router.post('/web/typeProduct/list', TypeProductList);
router.post('/web/product/detail', ProductInfoDetailH5);

module.exports = router;
