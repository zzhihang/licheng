<template>
  <div class="user-index">
    <h1>
      <span>快捷菜单</span>
      <el-button type="primary" plain>设置</el-button>
    </h1>
    <div class="user-content">
      <div class="menu-item">
        <div class="sub-title">竞价交易管理</div>
        <el-button type="primary">我发布的竞价交易</el-button>
      </div>
      <div class="menu-item">
        <div class="sub-title">竞价交易管理</div>
        <el-button type="primary">我发布的竞价交易</el-button>
      </div>
    </div>
    <h1 style="margin-top: 60px;">
      <span>我的个人信息</span>
    </h1>
    <div class="user-content base-info">
      <img :src="require('@images/avatar-default.png')" alt="">
      <div class="user-info">
        <div>
          <span class="title">用户名：</span>
          <span class="content">{{data.userName}}</span>
          <el-button type="text" style="margin-left: 50px;">修改登录密码</el-button>
          <el-button type="text" style="margin-left: 24px;">绑定手机号</el-button>
        </div>
        <div>
          <span class="title">{{data.companyStautsText}}：
            <el-tag v-if="Number(data.companyStatus) === 1" type="success" size="small">{{data.companyStautsText}}</el-tag>
            <el-button class="auth-button" v-else type="primary" size="mini" @click="$router.push({path: '/center/user/enterprise-auth'})">认证</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {getUserInfo} from "@/api/user/user";
import {COMPANY_STATUS, getLabelByValue} from "@utils/const";

export default {
  components: {

  },
  data() {
    return {
      data: {}
    }
  },
  created(){
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const {data} = await getUserInfo();
      data.companyStautsText = getLabelByValue(data.companyStatus, COMPANY_STATUS);
      this.data = data;
    }
  },
}
</script>

<style lang="scss" scoped>
  .user-index{
    h1{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      background: #EBECF0;
      border-radius: 8px;
      font-weight: bold;
      padding: 0 24px;
    }
    .user-content{
      background: #F9F9FC;
      border-radius: 8px;
      padding: 24px;
      margin-top: 20px;
      .menu-item{
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        &:last-child{
          margin-bottom: 0;
        }
      }
      .sub-title{
        color: #333333;
        line-height: 22px;
        font-size: 16px;
        margin-right: 16px;
        font-weight: bold;
      }
    }
    .base-info{
      display: flex;
      align-items: center;
    }
    img{
      width: 80px;
      height: 80px;
      margin-right: 40px;
      border-radius: 100%;
    }
    .user-info{
      font-size: 14px;
      .title{
        font-weight: 400;
        color: #666666;
        line-height: 22px;
      }
      .content{
        color: #1D2129;
        margin-left: 11px;
      }
    }
    .auth-button{
      padding: 4px 15px;
    }
  }
</style>
