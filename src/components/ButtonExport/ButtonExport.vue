<template>
  <div style="display: inline-block">
    <el-button type="primary" @click="exportClick">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import smsModal from '../../views/user/modules/smsModal'
  import { SYSTEM_HOST } from '../../utils/system_const'

  export default {
    components: {
      smsModal,
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'all' //part 全部
      },
      ids: {
        type: Array,
        default: []
      },
      billType:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        exportSmsVisible: false,
        ifNeedSms: false,
        toPhone: ''
      }
    },
    methods: {
      async exportClick(){
        if(this.type !== 'all'){
          if(!this.ids.length){
            return this.$message.warn('请先选择要导出的数据')
          }
        }
        this.exportData()
      },
      async exportData() {
        if(this.type === 'all'){
          window.open(`${SYSTEM_HOST}${this.url}`, '_blank')
        }else{
          window.open(`${SYSTEM_HOST}${this.url}?ids=${this.ids.join(',')}`, '_blank')
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  /deep/.ant-input-affix-wrapper .ant-input-suffix{
    right: 0;
  }
</style>
