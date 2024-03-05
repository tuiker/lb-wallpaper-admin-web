<template>
  <div class="home-container">
    <h1>蓝博壁纸管理系统首页视图</h1>
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'

export default {
  name: 'home',
  data() {
    return {
      
    }
  },
  components: {
    LineChart
  },
  created() {
  },
  methods: {
    
  }




}
</script>

<style lang="scss" scoped>
.home-container {

  .panel-group {
    .card-panel {
      height: 400px;
      background-color: #fff;
      border-radius: 6px;
      padding: 16px 30px;

      .title {
        color: #101010;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
      }

      .desc {
        .content {

          .title {
            font-size: 18px;
            color: white;
            border: 1px solid;
          }
        }

        >div+div {
          margin-top: 26px;
        }
      }
    }
  }

  .table {
    margin-top: 32px;
    padding: 20px 30px;
    background: #fff;
    border-radius: 6px;

    .title {
      color: #101010;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 20px;
    }
  }

}


@media (min-width: 992px) {
  .el-col-lg-24-5 {
    width: 33.3%;
  }
}

@media (min-width: 1350px) {
  .el-col-lg-24-5 {
    width: 20%;
  }
}


.content {
  height: 148px;
  padding: 16px 30px;
  background: #bc8ef7;
  border-radius: 10px;
  color: #fff;

  .title,
  .text,
  .today {
    font-size: 16px;
    color: #fff;
  }

  .totality {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    margin-top: 8px;
  }

  .el-col {
    padding-top: 10px;
  }

}

.chartDiv {
  background-color: #fff;
  border-radius: 6px;
  padding-top: 20px;
  padding-left: 20px;
}
</style>
