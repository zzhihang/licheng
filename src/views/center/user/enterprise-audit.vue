<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <data-table ref="table" :columns="columns" url="/company/auditList">
      <template slot="operate" slot-scope="{row}">
        <el-button
          v-if="String(row.status) === '0'"
          type="text"
          @click="onAuditClick(row)"
        >
          审核
        </el-button>

      </template>
    </data-table>
  </div>
</template>

<script>
import SearchForm from "@components/SearchForm/SearchForm";
import {ENTERPRISE_AUDIT_STATUS, ENTERPRISE_AUDIT_TYPE, FORM_TYPE} from "@utils/const";
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
        label: '资料类型',
        type: FORM_TYPE.SELECT,
        options: ENTERPRISE_AUDIT_TYPE
      },{
        field: 'status',
        label: '审核状态',
        type: FORM_TYPE.SELECT,
        options: ENTERPRISE_AUDIT_STATUS
      },{
        field: 'name',
        label: '企业名称',
      },{
        field: 'code',
        label: '信用代码',
      }],
      columns: [{
        name: '企业名称',
        key: 'name',
      },{
        name: '信用代码',
        key: 'code',
      },{
        name: '法人姓名',
        key: 'legalPerson',
      },{
        name: '资料类型',
        key: 'type',
        dict: ENTERPRISE_AUDIT_TYPE
      },{
        name: '提交时间',
        key: 'createTime',
      },{
        name: '审核状态',
        key: 'status',
        dict: ENTERPRISE_AUDIT_STATUS
      },{
        name: '操作',
        key: 'operate',
        slots: ['operate'],
        width: 80
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
    onAuditClick(row){
      if(String(row.type) === '0'){
        this.$router.push({path: `/center/user/enterprise/${row.id}?type=audit`})
      }else{
        this.$router.push({path: `/center/user/enterprise-operate/${row.id}?type=audit`})
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
