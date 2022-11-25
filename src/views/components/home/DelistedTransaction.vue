<template>
  <div class="w">
    <floor-title :show-more="true" title="摘牌交易"></floor-title>
    <data-table style="margin-top: 30px;" :columns="columns" url="/listing/index/list" data-key="data"></data-table>
  </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import AuctionTransactionCard from "@/views/components/home/AuctionTransactionCard";
import DataTable from "@components/DataTable/DataTable";

export default {
  components: {
    FloorTitle,
    DataTable,
    AuctionTransactionCard
  },
  data() {
    return {
      columns: [{
        name: '挂牌编号',
        key: 'code',
      },{
        name: '供货商',
        key: 'manufacturer',
      },{
        name: '商品名称',
        key: 'goodsName',
      },{
        name: '挂牌时间',
        key: 'postTime',
      },{
        name: '挂牌价',
        key: 'unitPrice',
      },{
        name: '供货量',
        key: 'num',
      },{
        name: '成交状态',
        key: 'status',
      }],
      tableData: []
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
