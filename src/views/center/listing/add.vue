<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" @click="submitForm(1)">发布</el-button>
    </form-render>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {addListing, getListingDetail} from "@/api/listing/listing";
import {LISTING_ADD_MODEL} from "@views/center/listing/model";
import {addNews} from "@/api/news/news";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: LISTING_ADD_MODEL,
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
          this.$callConfirm({
            info: '是否确定发布挂牌交易',
            tip: '发布后即时生效',
            hiddenConfirm: status === 0,
            onConfirm: async (done) => {
              const params = this.$refs.formRender.getData();
              params.status = status;
              const result = await addListing(params);
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
