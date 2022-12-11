<template>
  <div>
    <preview-render :list="list"
                    :data-source="dataSource"
    ></preview-render>
    <div class="button-box">
      <el-button type="primary" plain @click="onAuditClick(2)">审核驳回</el-button>
      <el-button type="primary" @click="onAuditClick(3)">审核通过</el-button>
    </div>
  </div>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {ENTERPRISE_MODEL} from "@views/center/user/model/enterprise-model";
import {auditEnterprise, getEnterprise} from "@/api/user/user";
import {addBidding} from "@/api/bidding/bidding";

export default {
  components: {
    PreviewRender,
  },
  data() {
    return {
      list: ENTERPRISE_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    async getData() {
      const {data} = await getEnterprise(this.id)
      this.dataSource = data;
    },
    async onAuditClick(status){
      this.$callConfirm({
        info: '是否确定审核通过',
        tip: '审核通过后将为企业开通交易权限',
        hiddenConfirm: status === 0,
        onConfirm: async (done) => {
          const result = await auditEnterprise({id: this.id, status, type: 0})
          if(result.code === 200){
            this.$message.success(result.msg);
            this.$router.go(-1)
          }else{
            this.$message.error(result.msg)
          }
          if(result.code === 200){
            this.$router.go(-1);
            this.$message.success(result.msg)
          }else{
            this.$message.error(result.msg)
          }
          done && done();
        }
      })

    }
  },
}
</script>

<style lang="scss" scoped>
  .button-box{
    text-align: center;
    margin-top: 65px;
  }
</style>
