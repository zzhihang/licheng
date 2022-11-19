<template>
  <div>
    <form-render ref="formRender" :data="formData"></form-render>
    <div class="form-button-box">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" plain @click="submitForm(1)">发布</el-button>
      <el-button type="primary" @click="resetForm()" plain>清空</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FormRender from '@components/FormRender/FormRender'
import {GOODS_FIND_WAREHOUSE_MODEL} from "@views/center/storage/publish/model/model";
import {saveGoodsFindWarehouse} from "@/api/storage/storage";
export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: GOODS_FIND_WAREHOUSE_MODEL
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
          params.status = status;
          const result = await saveGoodsFindWarehouse(params);
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
