<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <div class="bill-action">
      <router-link to="/center/news/add">
        <el-button icon="el-icon-plus" type="warning">发布</el-button>
      </router-link>
    </div>
    <data-table ref="table" :columns="columns" url="/bulktrade/news/list">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" v-if="row.status === 0">编辑</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/news/delete/"
          :id="row.id"
          title="是否确定删除草稿"
          @onSuccess="onSearch"
          v-if="row.status === 0"
        >
          删除
        </confirm-button>
        <el-button type="text" v-if="row.status === 1 || row.status === 2">查看</el-button>
        <confirm-button
          style="margin-left: 8px"
          url="/news/off/"
          :id="row.id"
          @onSuccess="onSearch"
          title="是否确定取消发布"
          v-if="row.status === 1"
        >
          取消发布
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, NEWS_STATUS, NEWS_TYPE} from "@utils/const";
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
        field: 'title',
        label: '资讯名称'
      },{
        field: 'postTime',
        label: '发布日期',
        type: FORM_TYPE.DATEPICKER
      }],
      columns: [{
        name: '资讯名称',
        key: 'title',
      },{
        name: '资讯类型',
        key: 'newsType',
        dict: NEWS_TYPE
      },{
        name: '发布时间',
        key: 'createTime',
      },{
        name: '浏览量',
        key: 'pv',
      },{
        name: '状态',
        key: 'status',
        dict: NEWS_STATUS
      },{
        name: '下架时间',
        key: 'offTime',
      },{
        name: '操作',
        key: 'operate',
        slots: ['operate'],
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
