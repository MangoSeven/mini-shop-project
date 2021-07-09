/*
 * @Author: mango
 * @Date: 2020-11-25 15:06:02
 * @LastEditTime: 2020-11-30 14:01:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_vue\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './route';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
