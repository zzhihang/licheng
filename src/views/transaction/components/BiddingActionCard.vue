<template>
  <el-card class="action-card" body-style="padding: 0">
    <h3 class="title">
      <img :src="require('@images/jingjia.png')" alt="">
      <span>竞价</span>
    </h3>
    <div class="card-content">
      <p class="count-down">距离竞价结束时间：<span>0天2小时45分17秒</span></p>
      <p class="current-price">当前最高价格：1300.00元</p>
      <el-form :inline="true" :model="formData">
        <el-form-item label="价格">
          <el-input v-model="formData.user" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="formData.user" type="number" placeholder="数量"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click="onSubmit">提交竞价</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      formData: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss" scoped>
  .action-card{
    width: 346px;
    height: 248px;
    img{
      width: 22px;
      margin-right: 5px;
    }
    h3.title{
      font-size: 16px;
      color: #2468F2;
      font-weight: bold;
      display: flex;
      align-items: center;
      background: #E0E8F8;
      height: 55px;
      padding: 0 24px;
    }
    .card-content{
      padding: 12px 24px 15px;
    }
    .count-down{
      font-size: 14px;
      line-height: 22px;
      color: #2468F2;
    }
    .current-price{
      font-size: 12px;
      color: #666666;
      line-height: 17px;
      margin-top: 7px;
    }
    .el-form{
      margin-top: 18px;
    }
    .el-button{
      margin-top: 24px;
    }
    .el-input{
      width: 95px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
