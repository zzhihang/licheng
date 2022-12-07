<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <div class="bill-action">
      <router-link to="/center/bidding/add?type=2">
        <el-button icon="el-icon-plus" type="warning">发布整拍商品</el-button>
      </router-link>
      <router-link to="/center/bidding/add?type=1">
        <el-button icon="el-icon-plus" type="warning">发布竞价商品</el-button>
      </router-link>
      <el-button icon="el-icon-upload2" type="primary" plain>导出成交量</el-button>
    </div>
    <data-table ref="table" :columns="columns" url="/bidding/userPost">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" @click="$router.push({path: '/center/bidding/add', query: {id: row.id}})"
                   v-if="row.status === 0">编辑</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/bidding/delete/"
          :id="row.id"
          info="是否确定删除挂牌信息"
          tip="竞价商品删除后不可恢复"
          @onSuccess="onSearch"
          v-if="row.status === 0"
        >
          删除
        </confirm-button>
        <template v-if="row.status !== 0">
          <el-button type="text"
                     @click="$router.push({path: `/transaction/bidding/detail?id=${row.id}`})"
          >查看商品详情</el-button>
        </template>
        <el-button type="text"
                   v-if="row.status === 1 || row.status === 3"
                   @click="$router.push({path: `/center/bidding/record/${row.id}?status=${row.status}`})"
        >查看出价记录</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/news/off/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否确定取消发布竞价交易"
          tip="竞价交易取消发布后将变为草稿状态"
          v-if="row.status === 1"
        >
          取消发布
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {BIDDING_METHOD, BIDDING_TYPE, DICT_PRODUCT_LIST, FORM_TYPE, TRANSACTION_STATUS} from "@utils/const";
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
        label: '竞价日期',
        type: FORM_TYPE.DATEPICKER_RANGE
      }],
      columns: [{
        name: '活动ID',
        key: 'id',
        width: 80
      },{
        name: '活动名称',
        key: 'title',
      },{
        name: '竞价类型',
        key: 'type',
        dict: BIDDING_TYPE
      },{
        name: '竞价方式',
        key: 'method',
        dict: BIDDING_METHOD
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
        width: 400
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
