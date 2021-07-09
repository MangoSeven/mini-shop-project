<!--
 * @Author: mango
 * @Date: 2020-11-30 17:36:12
 * @LastEditTime: 2021-07-09 15:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\components\BasicLayout.vue
-->

<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <div class="collapse" @click="handleCollapse">
          <i :class="collapseIconName"></i>
        </div>
        <div class="sayHi">
          <span>你好！王小虎</span>
          <span>退出</span>
        </div>
      </el-header>
      <el-container style="height: 100%">
        <el-aside width="auto">
          <el-menu :collapse="isCollapse">
            <el-menu-item
              v-for="(item, index) in menuList"
              :key="index"
              @click="jumpTo(item.path)"
            >
              <i :class="item.iconName"></i>
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      collapseIconName: 'el-icon-s-unfold',
      menuList: [
        {
          iconName: 'el-icon-food',
          menuName: '首页banner',
          path: '/banner',
        },
        {
          iconName: 'el-icon-fork-spoon',
          menuName: '商品分类列表',
          path: '/commodityClassification',
        },
        {
          iconName: 'el-icon-umbrella',
          menuName: '商品详情列表',
          path: '/commodityDetailList',
        },
        {
          iconName: 'el-icon-grape',
          menuName: '新增商品',
          path: '/commodityDetail',
        },
        {
          iconName: 'el-icon-apple',
          menuName: '用户信息',
          path: '/userInfo',
        },
        {
          iconName: 'el-icon-ice-tea',
          menuName: '用户管理',
          path: '/userManage',
        },
      ],
    };
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseIconName = 'el-icon-s-fold';
      } else {
        this.collapseIconName = 'el-icon-s-unfold';
      }
    },
    // 切换侧边栏tab
    jumpTo(path) {
      if (path === this.$route.path) {
        return;
      }
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: #1f68de;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collapse {
  font-size: 24px;
  color: #fff;
}
.el-aside {
  background: #f3f3f3;
  //   width: 200px;
}
.sayHi {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 16px;
  padding-right: 30px;
  span {
    &:last-child {
      margin-left: 20px;
    }
  }
}
</style>
