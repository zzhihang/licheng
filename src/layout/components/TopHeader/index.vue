<template>
  <el-header>
    <div class="w">
      <div class="logo">
        <img :src="require('../../../../src/assets/images/logo.png')" alt="">
      </div>
      <div class="menu">
        <ul>
          <li v-for="(item, index) in menus" :class="{'active': active === index}" :key="index">
            <router-link :to="item.path">
              {{item.title}}
            </router-link>
          </li>
          <li @click="onLoginClick">登录</li>
          <li @click="$router.push('/register')">注册</li>
        </ul>
      </div>
    </div>
  </el-header>
</template>

<script>
import Vue from 'vue';
import LoginModal from "@views/LoginModal";
import {mapState} from "vuex";

export default {
  data(){
    return {
      active: 0,
      menus: [{
        title: '网站首页',
        path: '/home'
      },{
        title: '交易中心',
        path: '/transaction'
      },{
        title: '资讯中心',
        path: '/news'
      },{
        title: '物流服务',
        path: '/logistics'
      },{
        title: '仓储服务',
        path: '/storage'
      },{
        title: '供应链服务',
        path: '/supply'
      },{
        title: '用户中心',
        path: '/center'
      }]
    }
  },
  methods: {
    onLoginClick() {
      this.$store.dispatch('app/toggleLoginVisible', { visible: true })
    }
  },
  watch: {
    $route: {
      handler(val) {
        const path = val.fullPath;
        this.active = this.menus.findIndex(item => path.includes(item.path));
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  height: 66px;
  background: #2468F2;
  display: flex;
  .w{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo{
    img{
      width: 142px;
      height: 36px;
    }
  }
}
.menu{
  ul{
    display: flex;
    li{
      color: #FFFFFF;
      font-size: 14px;
      margin-right: 30px;
      position: relative;
      cursor: pointer;
    }
    .active{
      &:after{
        content: "";
        display: inline-block;
        position: absolute;
        bottom: -13px;
        height: 2px;
        width: 100%;
        background: #ffffff;
        left: 0;
      }
    }
  }
}
</style>
