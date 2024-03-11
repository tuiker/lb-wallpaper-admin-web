<template>
  <el-dialog
    :title="titel"
    :visible.sync="visible"
    width="900px"
    top="6vh"
    @close="resetFormData"
    v-loading="loading"
    :close-on-click-modal="false"
  >
    <div class="game">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="200px"
      >
        <el-form-item label="广告名称:" prop="advName">
          <el-input
            v-model="ruleForm.advName"
            placeholder="请输入广告名称"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告内容类型:" prop="contentsType">
          <el-radio v-model="ruleForm.contentsType" :label="1">图片</el-radio>
          <el-radio v-model="ruleForm.contentsType" :label="2">视频</el-radio>
        </el-form-item>
        <el-form-item
          v-show="ruleForm.contentsType === 1"
          label="广告内容:"
          prop="advImgValue"
          :rules="
            ruleForm.contentsType === 1
              ? { required: true, message: '请上传广告内容', trigger: 'change' }
              : null
          "
        >
          <upload
            :limit="1"
            :fileList="advImgList"
            :fileSize="10"
            @getUrl="getAdImgUrl($event, 1)"
            @delUrl="deleteAdvImg"
          />
        </el-form-item>
        <el-form-item
          v-show="ruleForm.contentsType === 2"
          label="广告内容:"
          prop="advVideoValue"
          :rules="
            ruleForm.contentsType === 2
              ? { required: true, message: '请上传广告内容', trigger: 'change' }
              : null
          "
        >
          <upload-file
            :limit="1"
            :accept="'.mp4'"
            :fileList="advVideoList"
            @getUrl="getAdImgUrl($event, 2)"
            @delUrl="deleteAdvVideo"
          />
        </el-form-item>
        <!-- <el-form-item label="广告路径类型:" prop="urlType">
          <el-radio v-model="ruleForm.urlType" :label="1">广告链接</el-radio>
          <el-radio v-model="ruleForm.urlType" :label="2">上传广告包</el-radio>
          <el-radio v-model="ruleForm.urlType" :label="3">加粉</el-radio>
        </el-form-item> -->
        <el-form-item
          v-show="ruleForm.urlType === 1"
          label="广告链接:"
          prop="advUrlValue"
          :rules="
            ruleForm.urlType === 1
              ? {
                  required: true,
                  message: '请填写广告链接地址',
                  trigger: 'change',
                }
              : null
          "
        >
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            maxlength="200"
            v-model="ruleForm.advUrlValue"
            placeholder="请输入广告链接"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="ruleForm.urlType === 2"
          label="上传广告包:"
          prop="advPackageUrlValue"
          :rules="
            ruleForm.urlType === 2
              ? { required: true, message: '请上传广告包', trigger: 'change' }
              : null
          "
        >
          <upload-file
            :limit="1"
            :accept="'.apk, .aab'"
            :file-list="packageUrlList"
            @getUrl="getAdvUrl($event)"
            @delUrl="deletePackage"
          />
        </el-form-item>
        <div v-show="ruleForm.urlType === 3">
          <el-form-item label="粉丝链接:" prop="attentionType">
            <el-radio v-model="ruleForm.attentionType" :label="1"
              >Kakao</el-radio
            >
            <el-radio v-model="ruleForm.attentionType" :label="2"
              >Bend</el-radio
            >
            <el-radio v-model="ruleForm.attentionType" :label="3"
              >whatsapp</el-radio
            >
          </el-form-item>
          <el-form-item
            prop="attentionTarget"
            :rules="
              ruleForm.urlType === 3
                ? {
                    required: true,
                    message: '请输入广告主加粉账户',
                    trigger: 'blur',
                  }
                : null
            "
          >
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              v-model="ruleForm.attentionTarget"
              style="width: 400px"
              placeholder="请输入广告主加粉账户"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="广告描述:" prop="advDesc">
          <el-input
            type="textarea"
            resize="none"
            :rows="5"
            v-model="ruleForm.advDesc"
            maxlength="300"
            style="width: 400px"
            placeholder="请输入广告描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import Upload from "@/components/Upload.vue";
import UploadFile from "@/components/UploadFile.vue";
import { AddAdv, UpdateAdv } from "@/api/advertising";

export default {
  data() {
    return {
      titel: "",
      loading: false,
      visible: false,
      advImgList: [],
      advVideoList: [],
      packageUrlList: [],
      ruleForm: {
        advName: "",
        contentsType: 1,
        advContents: "",
        advImgValue: "",
        advVideoValue: "",
        urlType: 1,
        advUrl: "",
        advDesc: "",
        advUrlValue: "",
        advPackageUrlValue: "",
        attentionTarget: "",
        attentionType: 1,
      },
      rules: {
        advName: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
        ],
        contentsType: [
          { required: true, message: "请选择广告内容类型", trigger: "change" },
        ],
        advContents: [
          { required: true, message: "请上传广告内容", trigger: "change" },
        ],
        advUrl: [
          { required: true, message: "请填写广告地址", trigger: "blur" },
        ],
        advDesc: [
          { required: true, message: "请输入广告描述", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Upload,
    UploadFile,
  },
  created() {},
  methods: {
    open(data) {
      if (data && data.id) {
        this.titel = "编辑广告";
        this.ruleForm = Object.assign(this.ruleForm, data);
        if (data.contentsType == 1) {
          //广告内容-图片
          this.ruleForm.advImgValue = data.advContents;
          this.advImgList = [{ name: data.advContents, url: data.advContents }];
        } else {
          //广告内容-视频
          this.ruleForm.advVideoValue = data.advContents;
          this.advVideoList = [
            { name: data.advContents, url: data.advContents },
          ];
        }

        if (data.urlType == 1) {
          //广告链接
          this.ruleForm.advUrlValue = data.advUrl;
        } else if (data.urlType == 2) {
          //广告包
          this.ruleForm.advPackageUrlValue = data.advUrl;
          this.packageUrlList = [{ name: data.advUrl, url: data.advUrl }];
        } else {
          //加粉
          this.ruleForm.attentionType = data.urlType % 10;
          this.ruleForm.urlType = 3;
          this.ruleForm.attentionTarget = data.advUrl;
        }
      } else {
        this.titel = "添加广告";
      }

      this.visible = true;
    },
    //提交
    submitForm(formName) {
      let instance = this;

      if (this.ruleForm.contentsType === 1) {
        //广告内容-图片
        this.ruleForm.advContents = this.ruleForm.advImgValue;
      } else if (this.ruleForm.contentsType === 2) {
        //广告内容-视频
        this.ruleForm.advContents = this.ruleForm.advVideoValue;
      }

      if (this.ruleForm.urlType === 1) {
        //广告链接
        this.ruleForm.advUrl = this.ruleForm.advUrlValue;
      } else if (this.ruleForm.urlType === 2) {
        //广告包
        this.ruleForm.advUrl = this.ruleForm.advPackageUrlValue;
      } else if (this.ruleForm.urlType === 3) {
        //加粉
        this.ruleForm.advUrl = this.ruleForm.attentionTarget;
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.ruleForm.urlType === 3) {
            //加粉
            //加粉类型 = 3 * 10 + n
            this.ruleForm.urlType =
              this.ruleForm.urlType * 10 + this.ruleForm.attentionType;
          }
          if (this.ruleForm.id) {
            UpdateAdv(instance.ruleForm)
              .then((res) => {
                this.$message.success("修改成功");
                this.$emit("success");
                this.visible = false;
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            AddAdv(instance.ruleForm)
              .then((res) => {
                this.$message.success("添加成功");
                this.$emit("success");
                this.visible = false;
              })
              .finally(() => {
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    //返回
    Back() {
      this.$router.go(-1);
    },
    getAdImgUrl(getUrl, contentsType) {
      if (contentsType === 1) {
        this.ruleForm.advImgValue = getUrl;
      } else if (contentsType === 2) {
        this.ruleForm.advVideoValue = getUrl;
      }
      this.$refs.ruleForm.validateField("fileList"); // 手动触发fileList校验规则
    },
    getAdvUrl(url) {
      this.ruleForm.advPackageUrlValue = url;
    },
    deleteAdvImg() {
      this.ruleForm.advImgValue = "";
    },
    deleteAdvVideo() {
      this.ruleForm.advVideoValue = "";
    },
    deletePackage() {
      this.ruleForm.advPackageUrlValue = "";
    },
    //重置表单
    resetFormData() {
      this.advImgList = [];
      this.advVideoList = [];
      this.packageUrlList = [];
      this.ruleForm = {
        advName: "",
        contentsType: 1,
        advContents: "",
        advImgValue: "",
        advVideoValue: "",
        urlType: 1,
        advUrl: "",
        advDesc: "",
        advUrlValue: "",
        advPackageUrlValue: "",
        attentionTarget: "",
        attentionType: 1,
      };
    },
  },
};
</script>
<style lang="scss">
.game {
  padding: 32px;
  background-color: #fff;

  .title {
    font-size: 16px;
    color: rgba(144, 147, 153, 1);
    font-weight: 800;
    margin-bottom: 20px;
  }

  .el-form {
    .el-form-item {
      margin-bottom: 20px;
    }

    .el-radio {
      margin-right: 50px;
    }

    .el-form-item__label {
      font-size: 16px;
      color: #131414;
      padding-right: 28px;
    }

    .el-button {
      width: 150px;
      padding: 12px 20px;
      margin-top: 40px;
    }
  }
}
</style>
