<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" plain @click="submitForm(1)">发布</el-button>
    </form-render>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {getGoodsFindCar, goodsFindCar} from "@/api/logistics/logistics";
import {GOODS_FIND_CAR_MODEL} from "@views/center/logistics/publish/model/model";

export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: GOODS_FIND_CAR_MODEL
    }
  },
  created() {
    this.title = this.$route.meta.title;
    if(this.$route.query.id){
      this.getDetail()
    }
  },
  methods: {
    async getDetail(){
      const {data} = await getGoodsFindCar(this.$route.query.id)
      if(this.$route.query.copy){
        delete data.id; //复制则删除id
      }
      data.fromDistrictId = data.fromDistrictId.split(',');
      data.toDistrictId = data.toDistrictId.split(',');
      this.$refs.formRender.setData(data)
    },
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$callConfirm({
            info: '是否确定发布此资讯',
            tip: '发布后即时生效',
            hiddenConfirm: status === 0,
            onConfirm: async (done) => {
              const params = this.$refs.formRender.getData();
              if(Array.isArray(params.fromDistrictId)){
                params.fromDistrictId = params.fromDistrictId.join(',')
              }
              if(Array.isArray(params.toDistrictId)){
                params.toDistrictId = params.toDistrictId.join(',')
              }
              params.status = status;
              const result = await goodsFindCar(params);
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
