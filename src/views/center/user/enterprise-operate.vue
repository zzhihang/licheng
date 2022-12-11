<template>
  <div>
    <div class="focus-area" v-if="String(companyStatus) === '0'">
      <p>请先进行企业认证，完成企业认证后即可上传营运资料</p>
      <el-button type="primary" @click="$router.push({path: '/center/user/enterprise-auth'})">企业认证</el-button>
    </div>

    <div class="focus-area">
      <p>上传营运资料，可解锁物流和仓储服务更多权限哦！</p>
      <el-button type="primary" @click="$router.push({path: '/center/user/enterprise-auth'})">营运资料认证</el-button>
    </div>

    <div class="focus-area" v-if="String(companyStatus) === '1'">
      <p>认证信息已提交，等待审核</p>
    </div>

    <div class="focus-area" v-if="String(companyStatus) === '2'">
      <p>企业营运资料认证审核驳回，请重新提交营运资料！</p>
      <p class="reason">驳回原因：请上传清晰的营业执照图片</p>
      <el-button type="primary" @click="$router.push({path: '/center/user/enterprise-auth'})">营运资料认证</el-button>
    </div>

    <preview-render :list="list"
                    :data-source="dataSource"
    ></preview-render>

  </div>
</template>

<script>
import {getCurrentEnterpriseOperateInfo, getUserInfo} from "@/api/user/user";
import {ENTERPRISE_OPERATE_MODEL} from "@views/center/user/model/enterprise-model";
import PreviewRender from "@components/PreviewRender/PreviewRender";

export default {
  components: {
    PreviewRender
  },
  data() {
    return {
      companyStatus: 0,
      list: ENTERPRISE_OPERATE_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await getUserInfo();
      //0 普通 1 认证 2 管理员 //TODO 使用全局store修改
      this.companyStatus = result.data.companyStatus
      if(this.companyStatus !== 0){
        await this.getAuthInfo();
      }
    },
    async getAuthInfo(){
      const result = await getCurrentEnterpriseOperateInfo();
      this.dataSource = result.data;
    }
  },
}
</script>

<style lang="scss" scoped>
.focus-area{
  margin-top: 318px;
  text-align: center;
  p{
    color: #333333;
    line-height: 22px;
    font-size: 16px;
  }
  .reason{
    color: #666666;
    line-height: 20px;
    font-size: 14px;
    margin-top: 12px;
  }
  .el-button{
    margin-top: 24px;
  }
}
</style>
