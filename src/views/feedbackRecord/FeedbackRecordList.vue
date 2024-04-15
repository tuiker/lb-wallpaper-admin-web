<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true">
        <el-form-item label="反馈类型" style="margin-bottom: 0px">
          <el-select
            v-model="queryParams.feedbackType"
            placeholder="请选择"
            @change="getTableData"
            clearable
          >
            <el-option :key="1" label="问题" :value="1"> </el-option>
            <el-option :key="2" label="建议" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px">
          <el-button @click="onSerach">查询</el-button>
          <el-button @click="onRefresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-table :data="tableData" row-key="id" v-loading="tableLoading" border>
      <el-table-column
        label="用户ID"
        prop="userId"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="用户昵称"
        prop="nickname"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="用户手机号"
        prop="phone"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="反馈类型"
        prop="feedbackType"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.feedbackType == 1" type="danger">问题</el-tag>
          <el-tag v-if="scope.row.feedbackType == 2">建议</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈内容"
        prop="feedbackContent"
        min-width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="反馈图片"
        prop="feedbackImgList"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.feedbackImgList"
            style="width: 100px; height: 100px"
            :src="JSON.parse(scope.row.feedbackImgList)[0]"
            :preview-src-list="JSON.parse(scope.row.feedbackImgList)"
          ></el-image>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈时间"
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
            <el-button type="text" size="small" @click="seeDetails(scope.row)"
              >查看</el-button
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

    <feedback-details ref="feedbackRecordModal"></feedback-details>
  </div>
</template>
<script>
import { PageList } from "@/api/feedbackRecord.js";
import FeedbackDetails from "./components/FeedbackDetails.vue";

export default {
  components: { FeedbackDetails },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      queryParams: {
        feedbackType: null,
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
      PageList(this.queryParams)
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
      this.queryParams = {
        feedbackType: null,
        page: 1,
        total: 0,
        pageSize: 10,
      };
      this.getTableData();
    },
    //查看详情
    seeDetails(row) {
      this.$refs.feedbackRecordModal.open(row);
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
