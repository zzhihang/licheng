<template>
  <el-button type="text"
             slot="suffix"
             @click="getCaptcha"
             :disabled="state.smsSendBtn"
             v-text="!state.smsSendBtn && '获取验证码' || (state.time+'s后可重新发送')"
  >发送验证码</el-button>
</template>

<script>
import Vue from 'vue';
import {getCodeSms} from "@/api/login";
import request from "@utils/request";

export default {
  props: ['mobile', 'url'],
  data() {
    return {
      state: {
        time: 60,
        smsSendBtn: false
      },
    }
  },
  methods: {
    getCaptcha (e) {
      if(!this.mobile){
        return this.$message.error('请输入手机号')
      }
      if(this.mobile.length !== 11){
        return this.$message.error('请输入正确的手机号')
      }
      const {state} = this;
      e.preventDefault()
      state.smsSendBtn = true
      request({
        url: this.url,
        headers: {
          isToken: false
        },
        method: 'post',
        timeout: 20000,
        data: {mobile: this.mobile}
      }).then(result => {
        if(result.code === 200){
          this.$message.success('发送成功')
          this.$emit('success', result.data.uuid);
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
        }else{
          this.$message.error(result.msg);
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
