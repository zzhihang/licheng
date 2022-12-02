<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" :url="url">
      <template slot="num" slot-scope="{row}">
        {{row.num}}（{{row.validNum}}）
      </template>
      <template slot="price" slot-scope="{row}">
        ¥{{row.price}}元
      </template>
      <template slot="total" slot-scope="{row}">
        ¥{{Number(row.price) * Number(row.num)}}元
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {ACTIVITY_TRANSACTION_STATUS, BIDDING_TRANSACTION_STATUS, FORM_TYPE} from "@utils/const";
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
      url: '',
      searchList: [{
        field: 'company',
        label: '采购公司名称',
      },{
        field: 'status',
        label: '报价状态',
        type: FORM_TYPE.SELECT,
        options: ACTIVITY_TRANSACTION_STATUS
      }],
      columns: [{
        name: '采购公司名称',
        key: 'company',
      },{
        name: '报价（¥）',
        key: 'price',
        slots: ['price'],
      },{
        name: '竞价数量（有效数量）',
        key: 'num',
        slots: ['num'],
      },{
        name: '总价(¥)',
        key: 'total',
        slots: ['total'],
      },{
        name: '报价时间',
        key: 'createTime',
      },{
        name: '第（N）次报价',
        key: 'sort',
      }]
    }
  },
  created() {
    this.url = '/biddingTransaction/offer/' + this.$route.params.id
    this.columns.push({
      name: String(this.$route.query.status) === '1' ? '报价状态' : '成交状态',
      key: 'transactionStatus',
      dict: String(this.$route.query.status) === '1' ? ACTIVITY_TRANSACTION_STATUS : BIDDING_TRANSACTION_STATUS,
    })
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
