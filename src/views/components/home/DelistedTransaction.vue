<template>
  <div class="w">
    <floor-title :show-more="true" title="摘牌交易"></floor-title>
    <el-table
      class="d-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="挂牌编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="供应商"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="挂牌时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="挂牌价">
      </el-table-column>
      <el-table-column
        prop="address"
        label="供货量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="成交状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import AuctionTransactionCard from "@/views/components/home/AuctionTransactionCard";

export default {
  components: {
    FloorTitle,
    AuctionTransactionCard
  },
  data() {
    return {
      tableData: [{
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
  .auction-card {
    margin-top: 30px;
  }

  .d-table{
    margin-top: 30px;
    ::v-deep .el-table__header-wrapper{
      th{
        height: 64px;
        background: rgba(36,104,242,0.1);
        font-weight: bold;
        color: #2468F2;
        font-size: 16px;
        text-align: center;
      }
    }

  }
</style>
