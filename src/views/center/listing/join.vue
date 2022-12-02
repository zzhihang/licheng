<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/listingTransaction/joinList">
      <template slot="num" slot-scope="{row}">
        {{row.num + row.unit}}
      </template>
      <template slot="operate" slot-scope="{row}">
        <el-button type="text"
                   @click="$router.push({path: `/transaction/listing/${row.id}`})"
        >查看</el-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, LISTING_TRANSACTION_STATUS} from "@utils/const";
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
        label: '商品名称'
      },{
        field: 'status',
        label: '交易状态',
        type: FORM_TYPE.SELECT,
        options: LISTING_TRANSACTION_STATUS
      },{
        field: 'time',
        label: '发布日期',
        type: FORM_TYPE.DATEPICKER_RANGE
      }],
      columns: [{
        name: '活动ID',
        key: 'id',
        width: 80
      },{
        name: '供货商名称',
        key: 'id',
      },{
        name: '商品名称',
        key: 'goodsName',
      },{
        name: '商品数量',
        key: 'num',
        slots: ['num'],
      },{
        name: '商品单价',
        key: 'unitPrice',
      },{
        name: '摘牌时间',
        key: 'listingEndTime',
      },{
        name: '交易状态',
        key: 'status',
        dict: LISTING_TRANSACTION_STATUS
      },{
        name: '操作',
        key: 'operate',
        slots: ['operate'],
        width: 100
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
