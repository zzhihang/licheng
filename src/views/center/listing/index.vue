<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <div class="bill-action">
      <router-link to="/center/listing/add">
        <el-button icon="el-icon-plus" type="warning">发布</el-button>
      </router-link>
    </div>
    <data-table ref="table" :columns="columns" url="/listing/userPost">
      <template slot="num" slot-scope="{row}">
        {{row.num + row.unit}}
      </template>
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" @click="$router.push({path: '/center/listing/add', query: {id: row.id}})"
                   v-if="row.status === 0">编辑</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/listing/delete/"
          :id="row.id"
          title="是否确定删除挂牌信息"
          @onSuccess="onSearch"
          v-if="row.status === 0"
        >
          删除
        </confirm-button>
        <template v-if="row.status !== 0">
          <el-button type="text"
                     @click="$router.push({path: `/center/listing/detail/${row.id}`})"
          >查看摘牌信息</el-button>
          <el-button type="text"
                     @click="$router.push({path: `/transaction/listing/${row.id}`})"
          >查看商品详情</el-button>
        </template>
        <confirm-button
          style="margin-left: 8px"
          url="/listing/end/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否确定结束挂牌"
          tip="商品尚未被摘牌，是否确认结束挂牌"
          v-if="row.status === 1"
        >
          结束挂牌
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, NEWS_STATUS, NEWS_TYPE, TRANSACTION_STATUS} from "@utils/const";
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
        options: TRANSACTION_STATUS
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
        name: '挂牌截止时间',
        key: 'listingEndTime',
      },{
        name: '发布时间',
        key: 'createTime',
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
