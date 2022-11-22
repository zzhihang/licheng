<template>
  <div>
    <el-button type="primary" style="margin-bottom: 14px;" @click="dialogVisible = true">
      类目管理
    </el-button>
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
        prop="id"
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
        width="300"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="text"
            style="margin-right: 18px;"
            @click="handleEdit(scope.row, 'action')">编辑</el-button>
          <confirm-button
            size="mini"
            type="text"
            title="是否确定禁用"
            :id="scope.row.id"
            style="margin-right: 18px;">禁用</confirm-button>
          <confirm-button
            size="mini"
            type="text"
            title="是否确定删除"
            style="margin-right: 18px;"
            :id="scope.row.id">删除</confirm-button>
          <el-button
            size="medium"
            type="text"
            v-if="scope.row.type === 1"
            @click="editImage(scope.row)">商品图片</el-button>
        </template>
      </el-table-column>
    </el-table>
    <product-class :modal-visible.sync="dialogVisible" @onSuccess="onSuccess" :tree-data="tableData"/>
    <edit-node-modal :visible.sync="editVisible" action="edit" @onSuccess="onSuccess" :node="currentNode"/>
    <edit-product-image :visible.sync="imageVisible" :node="currentNode" @onSuccess="onSuccess"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {getGoodsList} from "@/api/product/product";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";
import ProductClass from "@views/center/product/components/ProductClass";
import EditNodeModal from "@views/center/product/components/EditNodeModal";
import EditProductImage from "@views/center/product/components/EditProductImage";

export default {
  components: {
    ConfirmButton,
    ProductClass,
    EditNodeModal,
    EditProductImage
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      editVisible: false,
      imageVisible: false,
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
    editImage(row){
      this.currentNode = row;
      this.imageVisible = true;
    }
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
