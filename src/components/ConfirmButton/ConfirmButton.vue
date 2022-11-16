<template>
  <div style="display: inline-block">
    <el-button type="text" @click="deleteClick">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
  import request from '@/utils/request'

  const tipMap = {
    del: '删除',
    cancel: '取消'
  }

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
      ids: {
        type: Array,
        default: []
      },
    },
    methods: {
      async deleteClick(){
        if(!this.ids.length){
          return this.$message.warning(`请选择要操作的数据`)
        }
        this.$confirm({
          content: `确定删除吗？`,
          onOk: async () => {
            const result = await request({
              url: this.url,
              method: 'post',
              data: {ids: this.ids}
            })
            if (result.success) {
              this.$message.info(`删除成功`)
              this.$emit('deleteSuccess')
              //await this.$refs.table.refresh()
            } else {
              this.$message.error(result.msg)
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
