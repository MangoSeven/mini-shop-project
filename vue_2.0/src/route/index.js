/*
 * @Author: mango
 * @Date: 2020-11-25 15:29:01
 * @LastEditTime: 2021-06-22 14:14:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_vue\src\route\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/pages/welcome/index'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index'),
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('@/pages/userManage/index'),
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/pages/userInfo/index'),
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/pages/banner/index'),
  },
  {
    path: '/commodityClassification',
    name: 'commodityClassification',
    component: () => import('@/pages/commodityClassification/index'),
  },
  {
    path: '/commodityDetail/:id?',
    name: 'commodityDetail',
    component: () => import('@/pages/commodityDetail/index'),
  },
  {
    path: '/commodityDetailList',
    name: 'commodityDetailList',
    component: () => import('@/pages/commodityDetailList/index'),
  },
];
const router = new VueRouter({
  routes,
});
export default router;
