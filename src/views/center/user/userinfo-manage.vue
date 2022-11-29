<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/user/list">
      <template slot="operate" slot-scope="{row}">
        <confirm-button type="text"
                        :id="row.id"
                        @onSuccess="onSearch"
                        info="是否确定重置密码"
                        tip="重置密码后，将会给用户短信发送新的初始密码"
        >重置密码</confirm-button>
        <confirm-button
          v-if="Number(row.status) === 0"
          url="/company/disableTrade/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否确定禁用用户"
          tip="禁用后，用户将无法登录"
        >
          禁用
        </confirm-button>

        <confirm-button
          v-if="Number(row.status) === 1"
          url="/company/enableTrade/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否确定启用用户"
          tip="启用后，用户可正常登录"
        >
          启用
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {COMPANY_STATUS, FORM_TYPE, TRADE_STATUS, USER_STATUS} from "@utils/const";
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
        name: '用户名称/企业简称',
        key: 'userName',
        width: 180
      },{
        name: '注册时间',
        key: 'createTime',
      },{
        name: '是否企业认证',
        key: 'companyStatus',
        dict: COMPANY_STATUS
      },{
        name: '手机号码',
        key: 'phonenumber',
      },{
        name: '用户状态',
        key: 'status',
        dict: USER_STATUS
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
