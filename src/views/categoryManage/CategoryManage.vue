<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true">
        <el-form-item label="用户ID" style="margin-bottom: 0px">
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="分类名称" style="margin-bottom: 0px">
          <el-input
            v-model="queryParams.name"
            placeholder="输入分类名称进行查询"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px">
          <el-button @click="onSerach">查询</el-button>
          <el-button @click="onRefresh">刷新</el-button>
          <el-button type="primary" v-permission="'addUser'" @click="addRow"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-table :data="tableData" row-key="id" v-loading="tableLoading" border>
      <el-table-column
        label="编号"
        prop="id"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="分类名称"
        prop="name"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="详细信息"
        prop="details"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="壁纸数"
        prop="wallpaperNum"
        min-width="120"
        align="center"
      ></el-table-column>
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
              v-permission="'editUser'"
              @click="editRow(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-permission="'deleteUser'"
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

    <add-or-edit-category
      ref="addOrEditCategory"
      @success="getTableData"
    ></add-or-edit-category>
  </div>
</template>
<script>
import { GetCategoryPageList, DeleteById } from "@/api/category.js";
import AddOrEditCategory from "./components/AddOrEditCategory.vue";

export default {
  components: { AddOrEditCategory },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      timeRange: [],
      queryParams: {
        startTime: "",
        endTime: "",
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

      this.queryParams.startTime = "";
      this.queryParams.endTime = "";
      let timeRange = this.timeRange;
      if (null != timeRange && timeRange.length === 2) {
        this.queryParams.startTime = timeRange[0];
        this.queryParams.endTime = timeRange[1];
      }

      GetCategoryPageList(this.queryParams)
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
        startTime: "",
        endTime: "",
        name: "",
        page: 1,
        total: 0,
        pageSize: 10,
      };
      this.getTableData();
    },
    //添加
    addRow() {
      this.$refs.addOrEditCategory.open();
    },
    //编辑行
    editRow(row) {
      this.$refs.addOrEditCategory.open(row);
    },
    //删除行
    deleteRow(id) {
      this.$confirm("是否确认删除该分类？", "确认信息", {
        distinguishCancelAndClose: true,
      }).then(() => {
        DeleteById({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.getTableData();
        });
      });
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
