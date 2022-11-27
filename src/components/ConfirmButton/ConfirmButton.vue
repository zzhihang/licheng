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
      },
      info: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ''
      },
    },
    methods: {
      async deleteClick(){
        if(!this.id){
          return this.$message.warning(`请选择要操作的数据`)
        }
        const h = this.$createElement;
        await this.$msgbox({
          title: this.title || '操作提示',
          message: h('p', null, [
            h('span', {class: 'content'}, this.info || `是否确定进行此操作?`),
            h('div', {style: 'font-size: 12px; color: #9BA2AB;'}, this.tip)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '请求中...';
              const result = await request({
                url: URL_PREFIX + this.url + this.id,
                method: 'get',
              })
              if (result.code === 200) {
                this.$emit('onSuccess')
              }
              instance.confirmButtonLoading = false;
              this.$message.success(result.msg)
              done();
            } else {
              done();
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
