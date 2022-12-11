<template>
  <div>
    <div class="focus-area" v-if="String(companyStatus) === '0'">
      <p>用户进行企业认证后，将享受更多权限</p>
      <el-button type="primary" @click="$router.push({path: '/center/user/enterprise-auth'})">企业认证</el-button>
    </div>

    <div class="focus-area" v-if="String(companyStatus) === '1'">
      <p>认证信息已提交，等待审核</p>
    </div>

    <div class="focus-area" v-if="String(companyStatus) === '2'">
      <p>企业认证驳回，请重新提交企业资料</p>
      <p class="reason">驳回原因：请上传清晰的营业执照图片</p>
      <el-button type="primary" @click="$router.push({path: '/center/user/enterprise-auth'})">企业认证</el-button>
    </div>

    <preview-render :list="list"
                    v-if="String(companyStatus) === '3'"
                    :data-source="dataSource"
    ></preview-render>

  </div>
</template>

<script>
import Vue from 'vue';
import {getCurrentEnterpriseInfo, getUserInfo} from "@/api/user/user";
import {ENTERPRISE_MODEL} from "@views/center/user/model/enterprise-model";
import PreviewRender from "@components/PreviewRender/PreviewRender";

export default {
  components: {
    PreviewRender
  },
  data() {
    return {
      companyStatus: 0,
      list: ENTERPRISE_MODEL,
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
      this.companyStatus = result.user.companyStatus;
      if(this.companyStatus !== 0){
        await this.getAuthInfo();
      }
    },
    async getAuthInfo(){
      const result = await getCurrentEnterpriseInfo();
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
