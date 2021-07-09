<!--
 * @Author: mango
 * @Date: 2020-11-25 13:56:04
 * @LastEditTime: 2020-11-30 17:54:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_vue\src\App.vue
-->
<template>
  <div>
    <div v-if="isLogin">
      <router-view></router-view>
    </div>
    <div v-else>
      <BasicLayout>
        <router-view></router-view>
      </BasicLayout>
    </div>
  </div>
</template>

<script>
import BasicLayout from './components/BasicLayout';
export default {
  name: 'App',
  components: {
    BasicLayout,
  },
  computed: {
    isLogin() {
      if (this.$route.name === 'login') {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}
</style>
