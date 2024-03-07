<template>
  <el-dialog
    :title="titel"
    :visible.sync="visible"
    width="600px"
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
      <el-form-item label="分类名称:" prop="name">
        <el-input
          v-model.trim="formData.name"
          maxlength="30"
          placeholder="请输入分类名称"
        ></el-input>
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
import { AddCategory, UpdateCategory } from "@/api/category";

export default {
  components: {},
  data() {
    return {
      titel: "",
      visible: false,
      loading: false,
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        details: [
          { required: true, message: "请输入详细介绍", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    async open(data) {
      if (data && data.id) {
        this.titel = "编辑分类";
        this.formData = { ...data };
      } else {
        this.titel = "添加分类";
      }
      this.visible = true;
    },
    //提交表单
    submitForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.formData.id) {
            //修改
            UpdateCategory(this.formData)
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
            AddCategory(this.formData)
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
      this.formData = {
        name: "",
        details: "",
      };
    },
  },
};
</script>
