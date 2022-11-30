<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <el-row :gutter="20" style="margin-top: 30px;">
      <el-col v-for="(item, index) in data" :span="12" :key="index">
        <transaction-bidding-card :data="item" style="margin-bottom: 20px;"></transaction-bidding-card>
      </el-col>
    </el-row>
    <my-pager @current-change="onPageChange" :total="total" :page-size="2"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {BIDDING_METHOD, DICT_PRODUCT_LIST, FORM_TYPE, TRANSACTION_STATUS} from "@utils/const";
import TransactionBiddingCard from "@views/transaction/components/TransactionBiddingCard";
import {getTransactionBiddingList} from "@/api/transaction/transaction";
import SearchForm from "@components/SearchForm/SearchForm";
import MyPager from "@components/mine/MyPager/MyPager";

export default {
  components: {
    TransactionBiddingCard,
    SearchForm,
    MyPager
  },
  data() {
    return {
      searchList: [{
        field: 'manufacturer',
        label: '供应商名称 ',
      },{
        field: 'goodsName',
        label: '商品名称',
        type: FORM_TYPE.MY_SELECT,
        url: DICT_PRODUCT_LIST
      },{
        field: 'status',
        label: '活动状态',
        type: FORM_TYPE.SELECT,
        options: BIDDING_METHOD
      },{
        field: 'time',
        label: '竞价日期',
        type: FORM_TYPE.DATEPICKER_RANGE
      }],
      data: [],
      pageNum: 1,
      total: 1,
      queryParam: {}
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList(){
      const params = Object.assign({}, this.queryParam, {pageNum: this.pageNum, pageSize: 4})
      const result = await getTransactionBiddingList(params)
      this.data = result.rows;
      this.total = result.total;
    },
    onSearch(params) {
      this.queryParam = params;
      this.getList();
    },
    onPageChange(pageNum){
      this.pageNum = pageNum;
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
