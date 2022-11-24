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
import {BIDDING_ADD_MODEL, BIDDING_ADD_MODEL_ORDINARY} from "@views/center/bidding/model";
import {addBidding} from "@/api/bidding/bidding";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: BIDDING_ADD_MODEL,
    }
  },
  created() {
    this.type = this.$route.query.type;
    if(this.$route.query.id){
      this.getDetail()
    }
    if(String(this.$route.query.type) === '1'){
      this.formData = BIDDING_ADD_MODEL_ORDINARY; //普通竞价
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
          params.type = this.$route.query.type;
          const result = await addBidding(params);
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
