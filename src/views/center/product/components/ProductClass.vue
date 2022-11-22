<template>
  <div>
    <el-dialog title="类目管理" :visible.sync="modalVisible" @close="$emit('update:modalVisible',false)">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        :data="treeData"
        show-checkbox
        ref="tree"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        style="margin-top: 10px;"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
      >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.data.name }}</span>
        <span style="margin-left: 10px;">
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data, 'add')">
            新增下级
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data, 'edit')">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </el-dialog>
    <edit-node-modal :visible.sync="dialogVisible" :node="currentNode" :action="action" v-on="$listeners"/>
  </div>
</template>

<script>
import Vue from 'vue';
import EditNodeModal from "@views/center/product/components/EditNodeModal";

export default {
  components: {
    EditNodeModal
  },
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      action: 'add',
      currentNode: {}
    }
  },
  created() {

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getNode(node) {
      console.log(node)
    },
    edit(node, action) {
      this.dialogVisible = true;
      this.currentNode = node; //当前操作的节点
      this.action = action;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
