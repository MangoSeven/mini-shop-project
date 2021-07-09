<!--
 * @Author: mango
 * @Date: 2020-12-09 17:14:54
 * @LastEditTime: 2021-06-18 11:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\userManage\index.vue
-->
<template>
  <div style="padding:20px 50px">
    <div class="addBox">
      <el-button type="primary" @click="toggleUserModal()">新增用户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="name" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="appID" label="微信APPID"> </el-table-column>
      <el-table-column prop="des" label="备注"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="toggleUserModal(scope.row)" type="primary" round
            >修改</el-button
          >
          <el-button
            type="danger"
            round
            style="marginLeft:30px"
            @click="handleDeleteUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="微信APPID" :label-width="formLabelWidth">
          <el-input v-model="form.appID"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUserApi,
  userListApi,
  editUserApi,
  deleteUserApi,
} from '@/uitls/http';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        tel: '',
        appID: '',
        des: '',
      },
      formLabelWidth: '120px',
      actionType: 'add',
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 删除用户
    handleDeleteUser(row) {
      deleteUserApi(row).then(() => {
        this.getUserList();
        Message.success('删除成功');
      });
    },
    // 用户弹框
    toggleUserModal(row) {
      this.$data.dialogFormVisible = !this.$data.dialogFormVisible;
      if (row) {
        this.$data.form = row;
        this.$data.actionType = 'edit';
        return;
      }
      this.$data.actionType = 'add';
      this.$data.form = {};
    },
    // 新增用户
    sureAddUser() {
      if (this.$data.actionType === 'add') {
        addUserApi(this.$data.form).then(() => {
          this.getUserList();
          Message.success('新增成功');
        });
        return;
      }
      editUserApi(this.$data.form).then(() => {
        this.getUserList();
        Message.success('更新成功');
      });
    },
    getUserList() {
      userListApi().then((res) => {
        this.$data.tableData = res;
        this.$data.dialogFormVisible = false;
      });
    },
  },
};
</script>
<style scoped>
.addBox {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>
