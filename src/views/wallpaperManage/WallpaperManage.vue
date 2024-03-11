<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true">
        <el-form-item label="排序方式" style="margin-bottom: 0px">
          <el-select
            v-model="queryParams.sortType"
            placeholder="请选择"
            @change="getTableData"
          >
            <el-option :key="1" label="按创建时间倒序" :value="1"> </el-option>
            <el-option :key="2" label="按下载量倒序" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="壁纸名称" style="margin-bottom: 0px">
          <el-input
            v-model="queryParams.name"
            placeholder="输入壁纸名称进行查询"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px">
          <el-button @click="onSerach">查询</el-button>
          <el-button @click="onRefresh">刷新</el-button>
          <el-button
            type="primary"
            v-permission="'addWallpaper'"
            @click="addRow"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-table :data="tableData" row-key="id" v-loading="tableLoading" border>
      <el-table-column
        label="壁纸名称"
        prop="name"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="缩略图"
        prop="imgUrlList"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="JSON.parse(scope.row.imgUrlList)[0]"
            :preview-src-list="JSON.parse(scope.row.imgUrlList)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="详细信息"
        prop="details"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="分类"
        prop="categoryName"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="壁纸数"
        prop="imgUrlList"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ getWallpaperNum(scope.row.imgUrlList) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下载量"
        prop="downloadNum"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="创建时间"
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
          <template>
            <el-button
              v-permission="'updateWallpaper'"
              @click="editRow(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-permission="'deleteWallpaper'"
              @click="deleteRow(scope.row.id)"
              type="text"
              size="small"
              style="color: red"
              >删除</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryParams.pageSize"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="queryParams.total"
    >
    </el-pagination>

    <add-or-edit-wallpaper ref="addOrEditWallpaper" @success="getTableData">
    </add-or-edit-wallpaper>
  </div>
</template>
<script>
import { GetWallpaperInfoPageList, DeleteById } from "@/api/wallpaper.js";
import AddOrEditWallpaper from "./components/AddOrEditWallpaper.vue";

export default {
  components: { AddOrEditWallpaper },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      timeRange: [],
      queryParams: {
        sortType: 1,
        name: "",
        page: 1,
        total: 0,
        pageSize: 10,
      },
    };
  },

  created() {
    this.getTableData();
  },
  methods: {
    //获取分页列表数据
    getTableData() {
      this.tableLoading = true;
      GetWallpaperInfoPageList(this.queryParams)
        .then((res) => {
          this.tableData = res.data.list;
          this.queryParams.total = res.data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    //查询
    onSerach() {
      this.queryParams.page = 1;
      this.getTableData();
    },
    //刷新
    onRefresh() {
      this.timeRange = [];
      this.queryParams = {
        sortType: 1,
        name: "",
        page: 1,
        total: 0,
        pageSize: 10,
      };
      this.getTableData();
    },
    //添加
    addRow() {
      this.$refs.addOrEditWallpaper.open();
    },
    //编辑行
    editRow(row) {
      this.$refs.addOrEditWallpaper.open(row);
    },
    //删除行
    deleteRow(id) {
      this.$confirm("是否确认删除该壁纸？", "确认信息", {
        distinguishCancelAndClose: true,
      }).then(() => {
        DeleteById({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
    },
    //获取壁纸数
    getWallpaperNum(imgUrlListStr) {
      let imgUrlList = JSON.parse(imgUrlListStr);
      return imgUrlList.length;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getTableData();
    },
  },
};
</script>
