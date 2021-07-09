<!--
 * @Author: your name
 * @Date: 2020-12-09 18:35:27
 * @LastEditTime: 2021-07-09 15:31:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\commodityDetail\index.vue
-->
<template>
  <div>
    <div class="bannerTitel">商品详情:</div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="type"
        label="商品分类"
        :rules="{
          required: true,
          message: '商品分类不能为空',
        }"
      >
        <el-select
          v-model="dynamicValidateForm.type"
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="item in typeList"
            :key="item._id"
            :label="item.type_name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="title" label="商品标题">
        <el-col :span="colNum">
          <el-input v-model="dynamicValidateForm.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="des" label="商品描述">
        <el-col :span="colNum">
          <el-input v-model="dynamicValidateForm.des"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="headImgs" label="头部图片">
        <el-upload
          action="xxx"
          :http-request="handleImgUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreviewHeadImg"
          :before-remove="handleRemoveHeadImg"
          :file-list="commodityHeadImgList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-for="(commodityParams, index) in dynamicValidateForm.commodityParams"
        :label="'商品参数' + index"
        :key="commodityParams.key"
        :prop="'commodityParams.' + index + '.value'"
        :rules="{
          required: true,
          message: '商品参数不能为空',
          trigger: 'blur',
        }"
      >
        <el-col :span="colNum">
          <el-input v-model="commodityParams.value"></el-input>
          <el-button @click.prevent="removeDomain(commodityParams)"
            >删除</el-button
          >
        </el-col>
        <el-button @click="addDomain">新增商品参数</el-button>
      </el-form-item>
      <el-form-item prop="detailImgs" label="商品详情图片">
        <el-upload
          action="xxx"
          :http-request="handleDetailImgUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreviewDetailImg"
          :before-remove="handleRemoveDetailImg"
          :file-list="commodityDetailImgList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogDetailVisible">
          <img width="100%" :src="dialogDetailImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >

        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  typeListApi,
  imgUploadApi,
  productInfoAddApi,
  productInfoUpdata,
  productInfoDetailApi,
} from '@/uitls/http';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      colNum: 20,
      dynamicValidateForm: {
        type: '',
        title: '',
        des: '',
        headImgs: [],
        commodityParams: [
          {
            value: '',
          },
        ],
        detailImgs: [],
      },
      copyDynamicValidateForm: {},
      dialogDetailImageUrl: '',
      dialogDetailVisible: false,
      commodityDetailImgList: [],
      dialogHeadImageUrl: '',
      dialogHeadVisible: false,
      commodityHeadImgList: [],
      typeList: [],
      headImgs: [],

      detailImgs: [],
    };
  },
  created() {
    this.getTypeList();
    if (this.$route.params.id) {
      this.getProductInfoDetail();
    }
  },
  methods: {
    // 获取商品详情
    getProductInfoDetail() {
      productInfoDetailApi({ id: this.$route.params.id }).then((res) => {
        this.$data.dynamicValidateForm = res;
        this.$data.copyDynamicValidateForm = res;
        this.headImgs = res.headImgs;
        this.$data.detailImgs = res.detailImgs;

        this.$data.commodityDetailImgList = res.detailImgs.map((item) => {
          const newItem = {
            url: item.url,
            id: item.id,
            filename: item.filename,
          };
          return newItem;
        });
        this.$data.commodityHeadImgList = res.headImgs.map((item) => {
          const newItem = {
            url: item.url,
            id: item.id,
            filename: item.filename,
          };
          return newItem;
        });
      });
    },
    // 获取类型列表
    getTypeList() {
      typeListApi().then((res) => {
        this.$data.typeList = res;
        this.$data.dialogFormVisible = false;
      });
    },

    // 头部图片上传
    handleImgUpload(options) {
      const { onSuccess, file } = options;
      const formData = new FormData();
      formData.append('files', file);
      formData.append('type', 'commodityDetail');

      imgUploadApi(formData).then((res) => {
        onSuccess();
        file.otherInfo = res;
        this.headImgs.push(res);
      });
    },
    // 删除头部图片
    handleRemoveHeadImg(file) {
      const { id } = file;
      // 更新头部图片数据
      this.headImgs.forEach((item, index) => {
        if (item.id === id) {
          this.headImgs.splice(index, 1);
          console.log(this.headImgs, '=============this.headImgs');
        }
      });

      console.log(
        this.headImgs,
        'this.headImgs========================1111',
        id
      );
    },
    // 详情图片上传
    handleDetailImgUpload(options) {
      const { onSuccess, file } = options;
      const formData = new FormData();
      formData.append('files', file);
      formData.append('type', 'commodityDetail');
      imgUploadApi(formData).then((res) => {
        onSuccess();
        this.$data.detailImgs.push(res);
      });
    },
    // 删除详情图片
    handleRemoveDetailImg(file) {
      const { id } = file;
      // 本地删除图片数据
      this.detailImgs.forEach((item, index) => {
        if (item.id === id) {
          this.detailImgs.splice(index, 1);
          console.log(this.detailImgs, '=============this.detailImgs');
        }
      });
      Message.success('删除成功');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const headImgsArr = this.headImgs.map((item) => {
            if (item.url) {
              delete item.url;
            }
            return item;
          });
          const detailImgsArr = this.$data.detailImgs.map((item) => {
            if (item.url) {
              delete item.url;
            }
            return item;
          });
          const params = {
            ...this.$data.dynamicValidateForm,
            headImgs: headImgsArr,
            detailImgs: detailImgsArr,
          };
          if (this.$route.params.id) {
            /**
             * // TODO 更新接口暂时完成，但是极端情况有bug
             * 如 没有头部图片或者产品详情图片时后台会报错。
             * 上传图片但未更新，数据库中会有多余图片无法清除
             */
            productInfoUpdata({ ...params }).then(() => {
              Message.success('更新成功');
            });
          } else {
            productInfoAddApi({ ...params }).then(() => {
              Message.success('新增成功');
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.dynamicValidateForm = { ...this.copyDynamicValidateForm };
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.commodityParams.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.commodityParams.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.commodityParams.push({
        value: '',
        key: Date.now(),
      });
    },
    handlePictureCardPreviewDetailImg(file) {
      this.dialogDetailImageUrl = file.url;
      this.dialogDetailVisible = true;
    },

    handlePictureCardPreviewHeadImg(file) {
      this.dialogDetailImageUrl = file.url;
      this.dialogDetailVisible = true;
    },
  },
};
</script>
<style scoped lang="less">
.bannerTitel {
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 30px;
}
img {
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
}
</style>
