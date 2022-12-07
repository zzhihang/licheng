<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <div class="bill-action">
      <router-link to="/center/logistics/publish/goods-find-car">
        <el-button icon="el-icon-plus" type="warning">发布货找车资讯</el-button>
      </router-link>
      <router-link to="/center/logistics/publish/car-find-goods">
        <el-button icon="el-icon-plus" type="warning">发布车找货资讯</el-button>
      </router-link>
    </div>
    <data-table ref="table" :columns="columns" url="/goodsFindCar/userPostLogisticsList">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" v-if="row.status === 0">编辑</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/news/delete/"
          :id="row.id"
          info="是否确定删除草稿"
          tip="草稿删除后不可恢复"
          @onSuccess="onSearch"
          v-if="row.status === 0"
        >
          删除
        </confirm-button>
        <el-button type="text" v-if="row.status === 1 || row.status === 2">查看</el-button>
        <confirm-button
          :url="row.type === 0 ? '/carFindGoods/off/' : '/goodsFindCar/off/' "
          :id="row.id"
          @onSuccess="onSearch"
          title="是否确定取消发布"
          v-if="row.status === 1"
        >
          取消发布
        </confirm-button>
        <el-button type="text" v-if="row.status === 1 || row.status === 2">复制</el-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, LOGISTICS_TYPE, NEWS_STATUS, NEWS_TYPE} from "@utils/const";
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
        field: 'type',
        label: '资讯类型',
        type: 'select',
        options: LOGISTICS_TYPE
      },{
        field: 'status',
        label: '发布状态',
        type: 'select',
        options: NEWS_STATUS
      }],
      columns: [{
        name: '资讯名称',
        key: 'title',
      },{
        name: '资讯类型',
        key: 'type',
        dict: LOGISTICS_TYPE
      },{
        name: '发布状态',
        key: 'status',
        dict: NEWS_STATUS
      },{
        name: '发布时间',
        key: 'postTime',
      },{
        name: '下架时间',
        key: 'offTime',
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
