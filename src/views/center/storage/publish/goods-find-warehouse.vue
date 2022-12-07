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
import {GOODS_FIND_WAREHOUSE_MODEL} from "@views/center/storage/publish/model/model";
import {getGoodsFindWarehouse, saveGoodsFindWarehouse} from "@/api/storage/storage";

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
    if(this.$route.query.id){
      this.getDetail()
    }
  },
  methods: {
    async getDetail(){
      const {data} = await getGoodsFindWarehouse(this.$route.query.id)
      if(this.$route.query.copy){
        delete data.id; //复制则删除id
      }
      data.districtId = data.districtId.split(',')
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
              params.status = status;
              if(Array.isArray(params.districtId)){
                params.districtId = params.districtId.join(',')
              }
              const result = await saveGoodsFindWarehouse(params);
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
