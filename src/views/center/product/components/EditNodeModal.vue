<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="30%">
    <el-input v-model="nodeName"></el-input>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSaveClick">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import {addGoods, addGoodsType, getGoodsList} from "@/api/product/product";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: 'add'
    },
    node: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      nodeName: ''
    }
  },
  created() {

  },
  methods: {
    close(){
      this.$emit('update:visible',false)
    },
    async onSaveClick() {
      let params = {
        parentId: this.node.id,
        name: this.nodeName
      };
      if(this.action === 'edit'){
        params = {
          id: this.node.id,
          name: this.nodeName
        }
      }
      let service = addGoodsType;
      if(this.node.type === 1){
        service = addGoods;
        params = {
          id: this.node.id,
          typeId: this.node.parentId,
          name: this.nodeName,
        }
      }
      const result = await service(params);
      if(result.code === 200){
        this.$message.success(result.msg)
        this.close();
        this.$emit('onSuccess')
      }else{
        this.$message.error(result.msg);
      }
    }
  },
  watch: {
    node: {
      handler(val) {
        if(this.action === 'edit'){
          this.nodeName = this.node.name
        }
      },
      immediate: true
    }
  },
  computed: {
    dialogTitle(){
      return this.action === 'add' ? '新增节点' : '编辑节点'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
