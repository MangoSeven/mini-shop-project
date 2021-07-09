<!--
 * @Author: your title
 * @Date: 2021-01-13 16:38:39
 * @LastEditTime: 2021-06-22 16:33:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\commodityDetailList\index.vue
-->
<template>
  <div style="padding:20px 50px">
    <div class="title">
      商品详情列表：
    </div>
    <div class="addBox">
      <el-button type="primary" @click="jumpToAddCommodityDetail"
        >新增商品</el-button
      >
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="商品名称"> </el-table-column>
      <el-table-column prop="type.type_name" label="商品分类">
      </el-table-column>
      <el-table-column prop="des" label="商品描述"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            @click="jumpToCommodityDetail(scope.row)"
            type="primary"
            round
            >修改</el-button
          >
          <el-button
            type="danger"
            round
            style="marginLeft:30px"
            @click="handleDeleteCommodity(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { productInfoListApi, productInfoDelApi } from '@/uitls/http';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      tableData: [],
      formLabelWidth: '120px',
    };
  },
  created() {
    productInfoListApi({}).then((res) => {
      this.tableData = res;
    });
  },
  methods: {
    // 删除
    handleDeleteCommodity(row) {
      productInfoDelApi({ ...row }).then(() => {
        Message.success('删除成功');
      });
    },
    // 编辑
    jumpToCommodityDetail(row) {
      this.$router.push(`/commodityDetail/${row['_id']}`);
    },
    // 新增
    jumpToAddCommodityDetail() {
      this.$router.push('/commodityDetail');
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
