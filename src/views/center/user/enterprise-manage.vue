<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/company/list">
      <template slot="yingyun" slot-scope="{row}">
        <el-button type="text"
                   @click="$router.push({path: `/center/user/enterprise-operate/${row.id}`})"
        >查看</el-button>
      </template>
      <template slot="renzheng" slot-scope="{row}">
        <el-button type="text"
                   @click="$router.push({path: `/center/user/enterprise/${row.id}`})"
        >查看</el-button>
      </template>
      <template slot="operate" slot-scope="{row}">
        <confirm-button
          v-if="Number(row.tradeStatus) === 0"
          url="/company/disableTrade/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否禁止发布交易"
          tip="操作后此企业将无法发布交易"
        >
          禁止发布交易
        </confirm-button>

        <confirm-button
          v-if="Number(row.tradeStatus) === 1"
          url="/company/enableTrade/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否允许发布交易"
          tip="操作后此企业将允许发布交易"
        >
          允许发布交易
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, TRADE_STATUS} from "@utils/const";
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
        field: 'name',
        label: '企业名称',
      },{
        field: 'code',
        label: '信用代码',
      },{
        field: 'tradeStatus',
        label: '发布交易',
        type: FORM_TYPE.SELECT,
        options: TRADE_STATUS
      }],
      columns: [{
        name: '企业名称',
        key: 'name',
        width: 80
      },{
        name: '信用代码',
        key: 'code',
      },{
        name: '法人姓名',
        key: 'legalPerson',
      },{
        name: '联系人姓名',
        key: 'contact',
      },{
        name: '联系人电话',
        key: 'tel',
      },{
        name: '认证资料',
        key: 'renzheng',
        slots: ['renzheng'],
      },{
        name: '营运资料',
        key: 'yingyun',
        slots: ['yingyun'],
      },{
        name: '发布交易',
        key: 'tradeStatus',
        dict: TRADE_STATUS
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
