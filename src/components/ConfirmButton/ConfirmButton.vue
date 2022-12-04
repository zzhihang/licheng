<template>
  <div style="display: inline-block">
    <el-button :type="type" v-bind="$attrs" @click="onButtonClick">
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
        default: 'text'
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
      async onButtonClick(){
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
              if(this.url){//有url的自动请求 例如删除、取消等请求
                const result = await request({
                  url: URL_PREFIX + this.url + this.id,
                  method: 'get',
                })
                if (result.code === 200) {
                  this.$emit('onSuccess')
                  this.$message.success(result.msg)
                  instance.confirmButtonLoading = false;
                }else{
                  instance.confirmButtonLoading = false;
                }
              }else{
                this.$emit('onConfirm', () => {
                  instance.confirmButtonLoading = false;
                  done()
                })
              }
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
