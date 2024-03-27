<template>
  <el-dialog
    :title="titel"
    :visible.sync="visible"
    width="1000px"
    top="6vh"
    :close-on-click-modal="false"
  >
    <el-form ref="dataForm" :model="formData" label-width="200px">
      <el-form-item label="用户ID:" prop="userId">
        <el-input
          v-model="formData.userId"
          style="width: 400px"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称:" prop="nickname">
        <el-input
          v-model="formData.nickname"
          style="width: 400px"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="用户手机号:" prop="phone">
        <el-input
          v-model="formData.phone"
          style="width: 400px"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈类型:" prop="feedbackType">
        <el-tag v-if="formData.feedbackType == 1" type="danger">问题</el-tag>
        <el-tag v-if="formData.feedbackType == 2">建议</el-tag>
      </el-form-item>
      <el-form-item label="反馈内容:" prop="feedbackContent">
        <el-input
          type="textarea"
          :rows="4"
          v-model="formData.feedbackContent"
          style="width: 400px"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈图片:" prop="feedbackImgList">
        <el-image
          style="width: 100px; height: 100px; margin-right: 10px"
          v-for="(item, index) in feedbackImgList"
          :key="index"
          :src="item"
          :preview-src-list="feedbackImgList"
        ></el-image>
      </el-form-item>
      <el-form-item label="反馈时间:" prop="createTime">
        <el-input
          v-model="formData.createTime"
          style="width: 400px"
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      titel: "",
      visible: false,
      formData: {},
      feedbackImgList: [],
    };
  },
  methods: {
    open(data) {
      this.titel = "反馈详情";
      if (data && data.id) {
        this.formData = { ...data };
        this.feedbackImgList = JSON.parse(data.feedbackImgList);
      }
      this.visible = true;
    },
  },
};
</script>
