<template>
  <div style="display: inline-block">
    <el-button type="text" @click="deleteClick">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {URL_PREFIX} from "@utils/const";

  export default {
    props: {
      type: {
        type: String,
        default: 'del'
      },
      url: {
        type: String,
        default: ''
      },
      id: {
        type: [String, Number],
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      async deleteClick(){
        if(!this.id){
          return this.$message.warning(`请选择要操作的数据`)
        }
        this.$confirm(this.title || `是否确定进行此操作?`, '确定提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await request({
            url: URL_PREFIX + this.url + this.id,
            method: 'get',
          })
          if(result.code === 200){
            this.$emit('onSuccess')
          }
          this.$message.success(result.msg)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
