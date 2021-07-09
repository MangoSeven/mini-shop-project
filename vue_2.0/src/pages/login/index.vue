<!--
 * @Author: mango
 * @Date: 2020-11-25 17:38:26
 * @LastEditTime: 2021-05-27 09:46:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_vue\src\login\index.vue
-->
<template>
  <div class="loginBox">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item prop="name">
        <el-input
          v-model="ruleForm.name"
          autocomplete="off"
          placeholder="请输入用户名"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { loginApi } from '@/uitls/http';

export default {
  data() {
    var validateUserNamePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validateUserCodePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
        name: [{ validator: validateUserNamePass, trigger: 'blur' }],
        password: [{ validator: validateUserCodePass, trigger: 'blur' }],
      },
    };
  },
  // mounted() {

  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginApi(this.$data.ruleForm).then((res) => {
            window.localStorage.setItem('USERINFO', JSON.stringify(res));
            this.$router.replace('/welcome');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.loginBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  margin: auto;
  max-width: 600px;
  margin-top: 100px;
  .loginTitle {
    font-size: 30px;
    text-align: center;
    margin-bottom: 50px;
  }

  .password {
    margin-top: 50px;
  }
}
</style>

<style lang="less">
.loginBox {
  button {
    margin-top: 20px;
    width: 100%;
    font-size: 28px;
  }
  .el-input--medium .el-input__inner {
    height: 48px;
    line-height: 48px;
    font-size: 24px;
  }
  .el-form-item__error {
    font-size: 20px;
  }
  .el-input--medium .el-input__icon {
    font-size: 24px;
  }
}
</style>
