<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/listing/adminList"></data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, TRADE_STATUS, TRANSACTION_STATUS} from "@utils/const";
import DataTable from "@components/DataTable/DataTable";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";

export default {
  components: {
    SearchForm,
    DataTable,
    ConfirmButton
  },
  data() {
    return {
      searchList: [{
        field: 'goodsName',
        label: '商品名称',
      },{
        field: 'tradeStatus',
        label: '成交状态',
        type: FORM_TYPE.SELECT,
        options: TRANSACTION_STATUS
      },{
        field: 'manufacturer',
        label: '供货商名称',
      },{
        field: 'time',
        label: '挂牌日期',
        type: FORM_TYPE.DATEPICKER_RANGE,
      }],
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
        key: 'createTime',
      },{
        name: '挂牌价',
        key: 'unitPrice',
      },{
        name: '挂牌量',
        key: 'num',
      },{
        name: '采购商',
        key: 'purchaserCompany',
      },{
        name: '结束时间',
        key: 'transactionEndTime',
      },{
        name: '成交状态',
        key: 'status',
        dict: TRANSACTION_STATUS
      }]
    }
  },
  created() {
  },
  methods: {
    onSearch(params){
      this.queryParam = params;
      this.$refs.table.load(params)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
