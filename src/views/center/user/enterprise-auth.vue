<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </form-render>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {ENTERPRISE_MODEL} from "@views/center/user/model/enterprise-model";
import {saveEnterprise} from "@/api/user/user";
import {addBidding} from "@/api/bidding/bidding";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: ENTERPRISE_MODEL
    }
  },
  created() {
    this.title = this.$route.meta.title
  },
  methods: {
    submitForm() {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$callConfirm({
            info: '是否确定发布竞价交易',
            tip: '发布后待竞价开始时间时生效',
            onConfirm: async (done) => {
              const params = this.$refs.formRender.getData();
              const result = await saveEnterprise(params);
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
