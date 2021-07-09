/*
 * @Author: mango
 * @Date: 2020-11-30 15:40:29
 * @LastEditTime: 2021-06-22 16:08:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\uitls\http.js
 */
import http from './request';

// TODO 登录接口
export function loginApi(params) {
  return http.post('/management-system/login', params);
}
// 图片上传接口
export function imgUploadApi(params) {
  return http.post('/management-system/file/uploadFiles', params);
}
// 获取首页banner
export function homeBannerApi(params) {
  return http.post('/management-system/file/downloadFiles/banner/list', params);
}
// 删除首页banner图片
export function homeBannerDelApi(params) {
  return http.post(
    '/management-system/file/downloadFiles/banner/delete',
    params
  );
}
/**
 * 用户部分接口
 */
// 获取用户列表
export function userListApi(params) {
  return http.post('/management-system/user/userList', params);
}
// 新增用户
export function addUserApi(params) {
  return http.post('/management-system/user/addUser', params);
}

// 修改用户信息
export function editUserApi(params) {
  return http.post('/management-system/user/editUser', params);
}
// 删除用户
export function deleteUserApi(params) {
  return http.post('/management-system/user/deteleUser', params);
}
/**
 * 产品类型部分接口
 */
// 获取类型列表
export function typeListApi(params) {
  return http.post('/management-system/type/typeList', params);
}
// 新增类型
export function addTypeApi(params) {
  return http.post('/management-system/type/addType', params);
}

// 修改类型信息
export function editTypeApi(params) {
  return http.post('/management-system/type/editType', params);
}
// 删除类型
export function deleteTypeApi(params) {
  return http.post('/management-system/type/deleteType', params);
}
/**
 * 商品详情部分接口
 */
// 获得产品详情
export function productInfoDetailApi(params) {
  return http.post('/management-system/product/info/detail', params);
}
// 添加产品详情
export function productInfoAddApi(params) {
  return http.post('/management-system/product/info/add', params);
}

// 删除图片
export function deleteImgApi(params) {
  return http.post('/management-system/file/downloadFiles/delete', params);
}
// 更新产品详情
export function productInfoUpdata(params) {
  return http.post('/management-system/product/info/updata', params);
}
// 获取产品列表
export function productInfoListApi(params) {
  return http.post('/management-system/product/info/list', params);
}
// 删除商品信息
export function productInfoDelApi(params) {
  return http.post('/management-system/product/info/delete', params);
}
