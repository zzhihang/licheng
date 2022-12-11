<template>
  <div class="user-index">
    <h1>
      <span>快捷菜单</span>
      <el-button type="primary" plain @click="settingVisible = true">设置</el-button>
    </h1>
    <div class="user-content">
      <div class="menu-item" v-for="(item, index) in menus" :key="index">
        <div class="sub-title">{{item.title}}</div>
        <div class="sub-title-content">
          <template v-for="child in item.children">
            <el-button type="primary" :key="item.id" @click="onMenuClick(child)">{{child.title}}</el-button>
            <el-button v-for="grandSon in child.children" type="primary" :key="grandSon.id" @click="onMenuClick(grandSon)">{{grandSon.title}}</el-button>
          </template>
        </div>
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
          <el-button type="text" style="margin-left: 50px;" @click="passwordVisible = true">修改登录密码</el-button>
          <el-button type="text" style="margin-left: 24px;"  @click="mobileVisible = true">修改手机号码</el-button>
        </div>
        <div>
          <span class="title">{{data.companyStautsText}}：
            <el-tag v-if="Number(data.companyStatus) === 1" type="success" size="small">{{data.companyStautsText}}</el-tag>
            <el-button class="auth-button" v-else type="primary" size="mini" @click="$router.push({path: '/center/user/enterprise-auth'})">认证</el-button>
          </span>
        </div>
      </div>
    </div>
    <menu-setting :visible.sync="settingVisible" @onSuccess="onSuccess"/>
    <modify-password-modal :visible.sync="passwordVisible"/>
    <modify-mobile-modal :visible.sync="mobileVisible"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {getUserInfo, getUserShortcutMenu} from "@/api/user/user";
import {COMPANY_STATUS, DEFAULT_SHORT_CUT_MENUS, getLabelByValue} from "@utils/const";
import MenuSetting from "@views/center/user/components/MenuSetting";
import {deepClone} from "@utils";
import ModifyPasswordModal from "@views/center/user/components/ModifyPasswordModal";
import ModifyMobileModal from "@views/center/user/components/ModifyMobileModal";

export default {
  components: {
    MenuSetting,
    ModifyPasswordModal,
    ModifyMobileModal
  },
  data() {
    return {
      data: {},
      settingVisible: false,
      passwordVisible: false,
      mobileVisible: false,
      menus: []
    }
  },
  created(){
    this.getInfo();
    this.getMenus();
  },
  methods: {
    onSuccess(){
      this.getMenus();
    },
    onMenuClick(data){
      this.$router.push({path: data.path})
    },
    async getInfo() {
      const {user} = await getUserInfo();
      user.companyStautsText = getLabelByValue(user.companyStatus, COMPANY_STATUS);
      this.data = user;
    },
    async getMenus(){
      const {rows} = await getUserShortcutMenu()
      if(rows.length){
        this.menus = rows
      }else{
        this.menus = deepClone(DEFAULT_SHORT_CUT_MENUS)
      }
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
        flex-wrap: wrap;
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
        flex-shrink: 0;
      }
      .sub-title-content{
        flex: 1;
        .el-button{
          margin-bottom: 10px;
        }
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
