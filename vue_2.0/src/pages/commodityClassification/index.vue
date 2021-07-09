<!--
 * @Author: your type_name
 * @Date: 2020-12-09 18:34:59
 * @LastEditTime: 2021-06-18 11:20:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\commodityClassification\index.vue
-->
<template>
  <div style="padding:20px 50px">
    <div class="title">
      商品分类列表：
    </div>
    <div class="addBox">
      <el-button type="primary" @click="openAddClassificationModal"
        >新增分类</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="type_name" label="商品分类名称"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            @click="openEditClassificationModal(scope.row)"
            type="primary"
            round
            >修改</el-button
          >
          <el-button
            type="danger"
            round
            style="marginLeft:30px"
            @click="handleDeleteClassification(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="isAddClassification ? '新增商品名称' : '修改商品名称'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.type_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditOrAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addTypeApi,
  typeListApi,
  editTypeApi,
  deleteTypeApi,
} from '@/uitls/http';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      isAddClassification: true,
      actionType: 'add',
    };
  },
  mounted() {
    this.getTypeList();
  },
  methods: {
    getTypeList() {
      typeListApi().then((res) => {
        this.$data.tableData = res;
        this.$data.dialogFormVisible = false;
      });
    },

    // 删除
    handleDeleteClassification(row) {
      deleteTypeApi(row).then(() => {
        this.getTypeList();
        Message.success('删除成功');
      });
    },
    // 编辑
    openEditClassificationModal(row) {
      this.$data.dialogFormVisible = !this.$data.dialogFormVisible;
      if (row) {
        this.$data.form = row;
        this.$data.actionType = 'edit';
        return;
      }
      this.$data.actionType = 'add';
      this.$data.form = {};
    },
    // 新增
    openAddClassificationModal() {
      this.$data.dialogFormVisible = !this.$data.dialogFormVisible;
      this.$data.form = {};
    },
    handleEditOrAdd() {
      if (this.$data.actionType === 'add') {
        addTypeApi(this.$data.form).then(() => {
          this.getTypeList();
          Message.success('新增成功');
          this.$data.dialogFormVisible = !this.$data.dialogFormVisible;
        });
        return;
      }
      editTypeApi(this.$data.form).then(() => {
        this.getTypeList();
        Message.success('更新成功');
      });
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 30px;
}
.addBox {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>
