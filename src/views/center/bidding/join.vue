<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/biddingTransaction/joinList">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text"
                   v-if="String(row.status) === '2'"
                   @click="$router.push({path: `/transaction/bidding/detail?id=${row.id}`})"
        >参与竞价</el-button>
        <el-button type="text"
                   v-if="String(row.status) === '3'"
                   @click="$router.push({path: `/transaction/bidding/detail?id=${row.id}`})"
        >查看</el-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {ACTIVITY_STATUS, ACTIVITY_TRANSACTION_STATUS, BIDDING_METHOD, DICT_PRODUCT_LIST, FORM_TYPE} from "@utils/const";
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
        field: 'goodsId',
        label: '商品名称',
        type: FORM_TYPE.MY_SELECT,
        url: DICT_PRODUCT_LIST
      },{
        field: 'company',
        label: '供货商名称',
      },{
        field: 'status',
        label: '活动状态',
        type: FORM_TYPE.SELECT,
        options: ACTIVITY_STATUS
      }],
      columns: [{
        name: '活动ID',
        key: 'id',
        width: 80
      },{
        name: '活动名称',
        key: 'title',
      },{
        name: '活动状态',
        key: 'status',
        dict: ACTIVITY_STATUS
      },{
        name: '竞价方式',
        key: 'method',
        dict: BIDDING_METHOD
      },{
        name: '供应商名称',
        key: 'company',
      },{
        name: '商品名称',
        key: 'goodsName',
      },{
        name: '开始时间',
        key: 'startTime',
      },{
        name: '结束时间',
        key: 'endTime',
      },{
        name: '起拍价格（元）',
        key: 'baseUnitPrice',
      },{
        name: '总量',
        key: 'goodsNum',
      },{
        name: '是否成交',
        key: 'transactionStatus',
        dict: ACTIVITY_TRANSACTION_STATUS
      },{
        name: '操作',
        key: 'operate',
        slots: ['operate'],
        width: 200
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
