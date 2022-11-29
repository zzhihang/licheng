<template>
  <el-card class="rank-list" body-style="padding: 0">
    <h3 class="title">
      <img :src="require('@images/rank.png')" alt="">
      <span>排行版</span>
    </h3>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        header-align="center"
        align="center"
        label="排名">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="竞拍单价">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="数量">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      tableData:  [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
  .rank-list{
    padding: 24px;
    background: #ffffff;
    width: 346px;
    height: 270px;
    img{
      width: 22px;
      margin-right: 5px;
    }
    h3.title{
      font-size: 16px;
      color: #1D2129;
      font-weight: bold;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    ::v-deep .el-table th.el-table__cell{
      background: #F2F3F5 !important;
    }
  }
</style>
