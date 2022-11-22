<template>
  <el-dialog
    title="商品图片"
    :visible.sync="visible"
    class="image-dialog"
    @close="close"
    width="433px"
  >
    <div style="display: flex;">
      <el-image
        v-if="url"
        style="width: 104px; height: 104px;flex-shrink: 0"
        :src="url"
        :preview-src-list="[url]">
      </el-image>
      <image-upload v-model="image"></image-upload>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="onSaveClick">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import ImageUpload from '@components/ImageUpload'
import {addGoods, addGoodsType} from "@/api/product/product";

export default {
  components: {
    ImageUpload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      image: ''
    }
  },
  methods: {
    async onSaveClick() {
      let params = {
        id: this.node.id,
        typeId: this.node.parentId,
        imgUrl: this.image,
      }
      const result = await addGoods(params);
      if(result.code === 200){
        this.$message.success(result.msg)
        this.close();
        this.$emit('onSuccess')
      }else{
        this.$message.error(result.msg);
      }
    },
    close(){
      this.$emit('update:visible', false)
    }
  },
  computed: {
    url(){
      return this.node.imgUrl;
    }
  },
}
</script>

<style lang="scss" scoped>
  .image-dialog{
    ::v-deep .el-dialog__body{
      padding: 0 100px;
    }
    ::v-deep .el-upload-list--picture-card .el-upload-list__item, ::v-deep .el-upload--picture-card{
      width: 104px !important;
      height: 104px !important;
      margin-left: 24px;
    }
    ::v-deep .el-upload{
      margin-left: 24px;
    }
  }
</style>
