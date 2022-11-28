<template>
  <div>
    <form-render ref="formRender" :data="formData"></form-render>
    <div class="form-button-box">
      <el-button type="primary" plain @click="submitForm()">提交</el-button>
      <el-button type="primary" @click="resetForm()" plain>清空</el-button>
    </div>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {ENTERPRISE_MODEL} from "@views/center/user/model/enterprise-model";
import {saveEnterprise} from "@/api/user/user";

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
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.$refs.formRender.getData();
          const result = await saveEnterprise(params);
          if(result.code === 200){
            this.$router.go(-1);
            this.$message.success(result.msg)
          }else{
            this.$message.error(result.msg)
          }
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
