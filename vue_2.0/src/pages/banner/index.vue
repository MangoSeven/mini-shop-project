<!--
 * @Author: your name
 * @Date: 2020-12-09 18:33:55
 * @LastEditTime: 2021-07-09 15:30:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_2.0\src\pages\banner\index.vue
-->
<template>
  <div>
    <div class="bannerTitel">首页banner:</div>
    <el-upload
      list-type="picture-card"
      action="xxx"
      :http-request="handleImgUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <div class="imgListBox">
      <div v-for="item in fileList" :key="item" class="imgBox">
        <img :src="item.url" alt="" />
        <div class="modalBox">
          <el-button
            type="primary"
            icon="el-icon-zoom-in"
            circle
            @click="handlePictureCardPreview(item)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="bannerDel(item)"
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imgUploadApi, homeBannerApi, homeBannerDelApi } from '@/uitls/http.js';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
    };
  },
  created() {
    homeBannerApi({}).then((res) => {
      this.$data.fileList = res;
    });
  },
  methods: {
    // 删除图片
    bannerDel(item) {
      homeBannerDelApi({ id: item.id }).then((res) => {
        console.log(res, '删除成功');
        this.$data.fileList = res;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传
    handleImgUpload(options) {
      if (this.$data.fileList.length > 4) {
        Message.warning('最多上传五张照片');
        return;
      }
      const { onSuccess, file } = options;
      const formData = new FormData();
      formData.append('files', file);
      formData.append('type', 'banner');
      imgUploadApi(formData).then(() => {
        onSuccess();
        homeBannerApi({}).then((res) => {
          this.$data.fileList = res;
        });
      });
    },
  },
};
</script>
<style lang="less">
.el-upload-list--picture-card .el-upload-list__item {
  width: 300px;
  height: 200px;
}
.bannerTitel {
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 30px;
}
.imgListBox {
  display: flex;
  flex-wrap: wrap;
}
.imgBox {
  position: relative;
  width: 300px;
  height: 250px;

  margin: 5px;
  img {
    width: 300px;
    height: 250px;
  }
}
.modalBox {
  background-color: black;
  opacity: 0;
  width: 300px;
  height: 250px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.modalBox:hover {
  opacity: 0.5;
}
</style>
<style>
.el-upload-list--picture-card {
  display: none;
}
</style>
