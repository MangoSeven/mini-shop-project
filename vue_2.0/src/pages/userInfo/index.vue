<!--
 * @Author: your name
 * @Date: 2020-12-09 17:56:34
 * @LastEditTime: 2021-05-27 10:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\userInfo\index.vue
-->
<template>
  <div style="padding:20px 50px">
    <div class="addBox">
      <el-button type="primary" @click="toggleEidtUserInfoModal"
        >修改用户信息</el-button
      >
      <el-button type="primary" @click="toggleEditPasswordModal"
        >修改密码</el-button
      >
    </div>
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>

      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.tel" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" disabled></el-input>
      </el-form-item>
    </el-form>
    <!-- 修改用户信息 -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleEidtUserInfoModal">取 消</el-button>
        <el-button type="primary" @click="handleEditUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormPasswordVisible">
      <el-form :model="formPassword">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="formPassword.again"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleEditPasswordModal">取 消</el-button>
        <el-button type="primary" @click="handleEditPassWord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editUserApi } from '@/uitls/http';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormPasswordVisible: false,
      form: {
        name: '',
        password: '',
        tel: '',
      },
      formPassword: {},
      formLabelWidth: '120px',
    };
  },
  mounted() {
    const userInfo = window.localStorage.getItem('USERINFO');
    this.$data.form = JSON.parse(userInfo);
  },
  methods: {
    // 开合修改用户信息弹框
    toggleEidtUserInfoModal() {
      this.$data.dialogFormVisible = !this.$data.dialogFormVisible;
    },
    // 开合修改密码弹框
    toggleEditPasswordModal() {
      this.$data.dialogFormPasswordVisible = !this.$data
        .dialogFormPasswordVisible;
    },
    // 修改用户信息
    handleEditUserInfo() {
      this.getEditUserApi(this.$data.form);
      this.toggleEidtUserInfoModal();
    },
    // 修改密码
    handleEditPassWord() {
      if (this.$data.formPassword.password !== this.$data.formPassword.again) {
        Message.warning('两次密码输入不一致！');
      }
      const data = {
        ...this.$data.form,
        password: this.$data.formPassword.password,
      };
      this.getEditUserApi(data);
      this.toggleEditPasswordModal();
    },

    getEditUserApi(data) {
      editUserApi(data).then((res) => {
        window.localStorage.setItem('USERINFO', JSON.stringify(res));
        this.$data.form = res;
        Message.success('更新成功');
      });
    },
  },
};
</script>
<style scoped>
.addBox {
  display: flex;
  /* justify-content: space-between; */
  padding-bottom: 20px;
}
</style>
