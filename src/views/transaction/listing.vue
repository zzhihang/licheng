<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <el-row :gutter="21" style="margin-top: 30px;">
      <el-col v-for="(item, index) in data" :span="8" :key="index">
        <transaction-listing-card :data="item"  style="margin-bottom: 20px;"></transaction-listing-card>
      </el-col>
    </el-row>
    <my-pager @current-change="onPageChange" />
  </div>
</template>

<script>
import {BIDDING_METHOD, DICT_PRODUCT_LIST, FORM_TYPE} from "@utils/const";
import TransactionListingCard from "@views/transaction/components/TransactionListingCard";
import {getTransactionListingList} from "@/api/transaction/transaction";
import SearchForm from "@components/SearchForm/SearchForm";
import MyPager from "@components/mine/MyPager/MyPager";

export default {
  components: {
    TransactionListingCard,
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
    onPageChange(pageNum){
      this.pageNum = pageNum;
      this.getList()
    },
    async getList(){
      const params = Object.assign({}, this.queryParam, {pageNum: this.pageNum, pageSize: 4})
      const result = await getTransactionListingList(params)
      this.data = result.rows;
      this.total = result.total;
    },
    onSearch(params) {
      this.queryParam = params;
      this.getList();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
