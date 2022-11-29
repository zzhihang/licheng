<template>
  <div>
    <preview-render :list="list"
                    :data-source="dataSource"
    ></preview-render>
    <div class="button-box">
      <el-button type="primary" plain @click="onAuditClick(2)">审核驳回</el-button>
      <el-button type="primary" @click="onAuditClick(1)">审核通过</el-button>
    </div>
  </div>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {ENTERPRISE_OPERATE_MODEL} from "@views/center/user/model/enterprise-model";
import {auditEnterprise, getEnterpriseOperate} from "@/api/user/user";

export default {
  components: {
    PreviewRender,
  },
  data() {
    return {
      list: ENTERPRISE_OPERATE_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    async getData() {
      const {data} = await getEnterpriseOperate(this.id)
      this.dataSource = data;
    },
    async onAuditClick(status){
      const result = await auditEnterprise({id: this.id, status, type: 1})
      if(result.code === 200){
        this.$message.success(res.msg);
      }else{
        this.$message.error(res.msg)
      }
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
