<template>
  <div>
    <div class="inquire">
      <el-row>
        <el-button
          v-permission="'addAdv'"
          type="primary"
          style="float: right"
          @click="addClick"
          >添加广告</el-button
        >
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" align="center">
        <el-table-column label="序号" type="index" width="100" align="center">
          <template slot-scope="scope">
            <span>{{
              (params.page - 1) * params.pageSize + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告名称"
          prop="advName"
          min-width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="封面类型"
          prop="contentsType"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.contentsType == 1">图片</span>
            <span v-show="scope.row.contentsType == 2">视频</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告内容"
          prop="advContents"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <video
              v-if="scope.row.contentsType == 2"
              style="
                width: 100px;
                height: 100px;
                object-fit: cover;
                cursor: pointer;
              "
              :src="scope.row.advContents"
              @click="openVideoDialog(scope.row.advContents)"
            ></video>
            <el-image
              v-else
              style="width: 100px; height: 100px"
              :src="scope.row.advContents"
              :preview-src-list="[scope.row.advContents]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="广告描述"
          prop="advDesc"
          min-width="120"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          label="广告路径类型"
          prop="urlType"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.urlType == 1">广告链接</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="广告路径"
          prop="advUrl"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              v-show="scope.row.urlType == 1"
              :href="scope.row.advUrl"
              target="_blank"
              type="primary"
              :underline="false"
              >{{ scope.row.advUrl }}</el-link
            >
            <span v-show="scope.row.urlType != 1">{{ scope.row.advUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
          prop="createTime"
          min-width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="140"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="'editAdv'"
              @click="editRow(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-permission="'deleteAdv'"
              @click="deleteRow(scope.row.id)"
              type="text"
              size="small"
              style="color: red"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="paginationParams.pages"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="paginationParams.totals"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="视频预览"
      :visible.sync="videoDialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <video
        style="width: 100%; height: 400px"
        :src="previewVideoUrl"
        controls
      ></video>
    </el-dialog>

    <add-or-edit-advertising
      ref="addOrEditAdvDialog"
      @success="onRefresh"
    ></add-or-edit-advertising>
  </div>
</template>
<script>
import { PageList, DeleteById } from "@/api/advertising";
import AddOrEditAdvertising from "./compoments/AddOrEditAdvertising.vue";
export default {
  components: {
    AddOrEditAdvertising,
  },
  data() {
    return {
      AdValue: [],
      value: "",
      tableData: [],
      total: 1,
      params: {
        advId: 0,
        page: 1,
        pageSize: 10,
      },
      paginationParams: {
        pages: 1,
        totals: 1,
        size: 1,
      },
      videoDialogVisible: false,
      previewVideoUrl: "",
    };
  },
  created() {
    this.getAdvList();
  },
  methods: {
    onRefresh() {
      this.getAdvList();
    },
    //广告搜索
    getAdValue(val) {
      this.params.advId = val;
      this.getAdvList();
    },
    //添加广告
    addClick() {
      this.$refs.addOrEditAdvDialog.open();
    },
    //编辑广告
    editRow(row) {
      this.$refs.addOrEditAdvDialog.open(row);
    },
    //删除行
    deleteRow(id) {
      this.$confirm("是否确认删除该广告？", "确认信息", {
        distinguishCancelAndClose: true,
      }).then(() => {
        DeleteById({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.getAdvList();
        });
      });
    },
    //获取列表
    getAdvList() {
      let self = this;
      PageList(this.params).then((res) => {
        this.tableData = res.data.list;
        this.paginationParams.totals = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getAdvList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      this.getAdvList();
    },
    //校验地址是否是视频
    checkIsVideo(url) {
      return url.endsWith(".mp4");
    },
    //打开视频预览对话框
    openVideoDialog(url) {
      this.previewVideoUrl = url;
      this.videoDialogVisible = true;
    },
    //关闭视频预览对话框
    handleClose(done) {
      this.previewVideoUrl = "";
      this.videoDialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.inquire {
  background: #fff;
  padding: 20px 32px;
  margin-bottom: 26px;

  .title {
    font-size: 16px;
    color: #101010;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

.table {
  // background: #fff;

  .el-pagination {
    padding: 20px 40px;
    background: #fff;
  }
}
</style>
