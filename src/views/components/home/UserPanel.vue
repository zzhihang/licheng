<template>
  <div class="user-panel">
    <img class="avatar" :src="require('../../../../src/assets/images/default-avatar.png')" alt="">
    <div class="button-box">
      <el-button type="primary" class="login" round>登录</el-button>
      <el-button round>注册</el-button>
    </div>
    <div class="entry-list">
      <div class="entry-list-item" v-for="(item, index) in entryList" :key="index">
        <img :src="item.icon" alt="">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
  data(){
    return {
      entryList: [{
        icon: require('../../../../src/assets/icons/img/icon1.png'),
        title: '发布竞价交易'
      },{
        icon: require('../../../../src/assets/icons/img/icon2.png'),
        title: '参与竞价交易'
      },{
        icon: require('../../../../src/assets/icons/img/icon3.png'),
        title: '发布挂牌交易'
      },{
        icon: require('../../../../src/assets/icons/img/icon4.png'),
        title: '参与摘牌交易'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-panel{
    width: 260px;
    height: 342px;
    background: #ffffff;
    border-radius: 8px;
    padding: 30px 34px;
    margin-left: 20px;
    flex-shrink: 0;
    text-align: center;
    .avatar{
      height: 70px;
      width: 70px;
      border-radius: 100%;
    }
  }
  .button-box{
    margin-top: 24px;
    .el-button{
      width: 80px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
    }
  }
  .entry-list{
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    .entry-list-item{
      color: #3C3C3C;
      line-height: 18px;
      font-size: 12px;
      width: 50%;
      margin-bottom: 20px;
      img{
        height: 24px;
        width: 24px;
      }
      p{
        margin-top: 8px;
      }
    }
  }
</style>
