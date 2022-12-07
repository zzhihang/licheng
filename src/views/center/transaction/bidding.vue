<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/bidding/adminList">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text"
                   @click="$router.push({path: `/transaction/bidding/detail`, query: {id: row.id}})"
        >查看商品详情</el-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {BIDDING_METHOD, FORM_TYPE, TRANSACTION_STATUS} from "@utils/const";
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
        field: 'status',
        label: '交易状态',
        type: FORM_TYPE.SELECT,
        options: TRANSACTION_STATUS
      },{
        field: 'method',
        label: '竞价方式',
        type: FORM_TYPE.SELECT,
        options: BIDDING_METHOD
      },{
        field: 'time',
        label: '挂牌日期',
        type: FORM_TYPE.DATEPICKER_RANGE,
      },{
        field: 'companyName',
        label: '销售商名称',
      }],
      columns: [{
        name: '活动ID',
        key: 'id',
      },{
        name: '活动名称',
        key: 'title',
      },{
        name: '销售商名称',
        key: 'companyName',
      },{
        name: '竞价类型',
        key: 'type',
      },{
        name: '竞价方式',
        key: 'method',
      },{
        name: '商品名称',
        key: 'goodsName',
      },{
        name: '商品数量',
        key: 'goodsNum',
      },{
        name: '开始时间',
        key: 'startTime',
      },{
        name: '结束时间',
        key: 'endTime',
      },{
        name: '交易状态',
        key: 'status',
        dict: TRANSACTION_STATUS
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
