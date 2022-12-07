<template>
  <div>
    <form-render ref="formRender"
                 :data="formData"
    >
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" @click="submitForm(1)">发布</el-button>
    </form-render>

  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {addListing, getListingDetail} from "@/api/listing/listing";
import {BIDDING_ADD_MODEL, BIDDING_ADD_MODEL_ORDINARY} from "@views/center/bidding/model";
import {addBidding, getBiddingInfo} from "@/api/bidding/bidding";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";

export default {
  components: {
    FormRender,
    ConfirmButton
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
      const {data} = await getBiddingInfo(this.$route.query.id)
      this.$refs.formRender.setData(data)
    },
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.$refs.formRender.getData();
          if(new Date(params.startTime).getTime() > new Date(params.endTime).getTime()){
            this.$message.error('竞价结束时间要晚于竞价开始时间')
            return false;
          }
          if(new Date(params.deliveryStartTime).getTime() > new Date(params.deliveryEndTime).getTime()){
            this.$message.error('交货有效期结束时间要晚于交货有效期开始时间')
            return false;
          }
          this.$callConfirm({
            info: '是否确定发布竞价交易',
            tip: '发布后待竞价开始时间时生效',
            hiddenConfirm: status === 0,
            onConfirm: async (done) => {
              params.status = status;
              params.type = this.$route.query.type;
              const result = await addBidding(params);
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
    resetForm(cb){
      this.$refs.formRender.resetForm()
      cb();
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
