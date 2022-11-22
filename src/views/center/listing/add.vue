<template>
  <div>
    <form-render ref="formRender" :data="formData"></form-render>
    <div class="form-button-box">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" plain @click="submitForm(1)">发布</el-button>
      <el-button type="primary" @click="resetForm()" plain>重置</el-button>
    </div>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {addListing, getListingDetail} from "@/api/listing/listing";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: [],
    }
  },
  created() {
    this.title = this.$route.meta.title
    if(this.$route.query.id){
      this.getDetail()
    }
  },
  methods: {
    async getDetail(){
      const {data} = await getListingDetail(this.$route.query.id)
      this.$refs.formRender.setData(data)
    },
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.$refs.formRender.getData();
          params.status = status;
          const result = await addListing(params);
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
