<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </form-render>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {ENTERPRISE_MODEL, ENTERPRISE_OPERATE_MODEL} from "@views/center/user/model/enterprise-model";
import {saveEnterprise, saveOperate} from "@/api/user/user";
import {addBidding} from "@/api/bidding/bidding";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: ENTERPRISE_MODEL,

    }
  },
  created() {
    this.title = this.$route.meta.title;
    this.service = saveEnterprise;
    if(this.$route.query.type === 'operate'){
      this.formData = ENTERPRISE_OPERATE_MODEL
      this.service = saveOperate;
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$callConfirm({
            info: '是否确定提交企业认证',
            tip: '提交后请等待审核',
            onConfirm: async (done) => {
              const params = this.$refs.formRender.getData();
              const result = await this.service(params);
              if(result.code === 200){
                this.$router.go(-1);
                this.$message.success(result.msg)
              }else{
                this.$message.error(result.msg)
              }
              done && done();
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(){
      this.$refs.formRender.resetForm()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
