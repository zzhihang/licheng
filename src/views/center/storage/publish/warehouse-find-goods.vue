<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" plain @click="submitForm(1)">发布</el-button>
    </form-render>
  </div>
</template>

<script>
import Vue from 'vue';
import FormRender from '@components/FormRender/FormRender'
import {WAREHOUSE_FIND_GOODS_MODEL} from "@views/center/storage/publish/model/model";
import {getWarehouseFindGoods, saveWarehouseFindGoods} from "@/api/storage/storage";
import {addBidding} from "@/api/bidding/bidding";
export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: WAREHOUSE_FIND_GOODS_MODEL
    }
  },
  created() {
    if(this.$route.query.id){
      this.getDetail()
    }
  },
  methods: {
    async getDetail(){
      const {data} = await getWarehouseFindGoods(this.$route.query.id)
      if(this.$route.query.copy){
        delete data.id; //复制则删除id
      }
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
              const result = await saveWarehouseFindGoods(params);
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
