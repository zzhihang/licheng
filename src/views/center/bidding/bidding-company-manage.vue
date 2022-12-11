<template>
  <div>
    <search-form :list="searchList" @search="onSearch"></search-form>
    <el-table
      :data="tableData"
      style="width: 100%;"
      row-key="id"
      stripe
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="分类ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="action"
        width="150"
        label="操作">
        <template slot-scope="{row}">
          <el-button
            size="medium"
            type="text"
            v-if="row.level === 3"
            @click="handleEdit(row, 'action')">编辑竞价企业</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-company :visible.sync="editVisible" action="edit" @onSuccess="onSuccess" :node="currentNode"/>
  </div>
</template>

<script>
import {getGoodsList} from "@/api/product/product";
import {ACTIVITY_TRANSACTION_STATUS, ENABLE_STATUS, FORM_TYPE, PRODUCT_MANAGE_TYPE} from "@utils/const";
import EditCompany from "@views/center/bidding/components/EditCompany";
import SearchForm from "@components/SearchForm/SearchForm";

export default {
  components: {
    EditCompany,
    SearchForm
  },
  data() {
    return {
      searchList: [{
        field: 'company',
        label: '采购公司名称',
      },{
        field: 'status',
        label: '报价状态',
        type: FORM_TYPE.SELECT,
        options: ACTIVITY_TRANSACTION_STATUS
      }],
      tableData: [],
      editVisible: false,
      currentNode: {}
    }
  },
  created(){
    this.getList();
  },
  methods: {
    async getList() {
      const {rows} = await getGoodsList();
      this.tableData = rows;
    },
    handleEdit(node, action){
      this.editVisible = true;
      this.currentNode = node; //当前操作的节点
    },
    onSuccess(){
      this.getList();
    },
    onSearch(params){
      this.queryParam = params;
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background: rgba(244, 247, 252, 0.75);
}
::v-deep .el-table td.el-table__cell,{
  border-bottom: none;
}

::v-deep .el-table .el-table__header-wrapper th{
  background: rgba(36,104,242,0.1);;
  color: #2468F2;
}
</style>
