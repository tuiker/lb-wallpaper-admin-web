<template>
  <el-dialog
    :title="titel"
    :visible.sync="visible"
    width="800px"
    top="6vh"
    @close="resetFormData"
    v-loading="loading"
    :close-on-click-modal="false"
  >
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="formData"
      label-width="100px"
    >
      <el-form-item label="壁纸名称:" prop="name">
        <el-input
          v-model.trim="formData.name"
          maxlength="30"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="壁纸素材:" prop="imgUrlList">
        <upload
          ref="wallpaperUpload"
          :limit="10"
          :file-list="imgList"
          :showClearBtn="true"
          drag
          multiple
        />
      </el-form-item>
      <el-form-item label="选择分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择壁纸分类">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细介绍:" prop="details">
        <el-input
          type="textarea"
          resize="none"
          :rows="8"
          v-model="formData.details"
          maxlength="500"
          placeholder="请输入详细介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddWallpaperInfo, UpdateWallpaperInfo } from "@/api/wallpaper";
import { ListAllCategory } from "@/api/category";
import Upload from "@/components/Upload.vue";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      titel: "",
      visible: false,
      loading: false,
      formData: {},
      categoryList: [],
      imgList: [],
      rules: {
        name: [{ required: true, message: "请输入壁纸名称", trigger: "blur" }],
        imgUrlList: [
          { required: true, message: "请上传壁纸素材", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择壁纸分类", trigger: "change" },
        ],
        details: [
          { required: true, message: "请输入详细介绍", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let self = this;

    //获取所有壁纸分类
    ListAllCategory().then((res) => {
      self.categoryList = res.data;
    });
  },
  methods: {
    async open(data) {
      if (data && data.id) {
        this.titel = "编辑壁纸";
        this.formData = { ...data };
        this.handlerImgList(data.imgUrlList);
      } else {
        this.titel = "添加壁纸";
      }
      this.visible = true;
    },
    //提交表单
    submitForm() {
      this.formData.imgUrlList = this.getImgValue();
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.formData.id) {
            //修改
            UpdateWallpaperInfo(this.formData)
              .then((res) => {
                if (res.data) {
                  this.$message.success("修改成功");
                  this.$emit("success");
                  this.visible = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            //添加
            AddWallpaperInfo(this.formData)
              .then((res) => {
                if (res.data) {
                  this.$message.success("添加成功");
                  this.$emit("success");
                  this.visible = false;
                } else {
                  this.$message.error(res.msg);
                }
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
    //重置表单
    resetFormData() {
      this.imgList = [];
      this.formData = {
        name: "",
        imgUrlList: "",
        categoryId: null,
        details: "",
      };
    },

    //获取游戏主图url
    getImgValue() {
      let imgValues = [];
      this.$refs.wallpaperUpload.values.forEach((item) => {
        if (item && item.realUrl) {
          imgValues.push(item.realUrl);
        }
      });
      return imgValues.length > 0 ? JSON.stringify(imgValues) : "";
    },
    //处理游戏主图数组
    handlerImgList(mainLogoStr) {
      let self = this;
      self.imgList = [];
      let wallpaperList = JSON.parse(mainLogoStr);
      wallpaperList.forEach((item) => {
        self.imgList.push({ url: item, realUrl: item });
      });
    },
  },
};
</script>
