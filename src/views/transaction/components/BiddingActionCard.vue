<template>
  <el-card class="action-card" body-style="padding: 0">
    <h3 class="title">
      <img :src="require('@images/jingjia.png')" alt="">
      <span>竞价</span>
    </h3>
    <div class="card-content" v-if="!isFinish">
      <p class="count-down">{{isOpen ? '距离竞价结束时间' : '距离竞价开始时间'}}：<count-down :time="distance"/></p>
      <p class="current-price">当前最高价格：{{maxPrice}}元<el-button type="text" style="margin-left: 10px; padding: 0" @click="onRefreshClick(true)">刷新</el-button></p>
      <el-form :inline="true" :model="formData">
        <el-form-item label="价格">
          <el-input v-model="formData.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="formData.num" type="number" placeholder="数量"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;" class="sub-button">
        <el-button type="primary" @click="onSubmit">提交竞价</el-button>
      </div>
    </div>
    <div class="card-content" v-else>
      竞价已结束
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';
import {getBiddingMaxPrice, saveBiddingOffer} from "@/api/bidding/bidding";
import CountDown from "@components/CountDown/CountDown";

export default {
  components: {
    CountDown
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    distance: {
      type: Number,
      default: 0
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    isFinish: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      maxPrice: null,
      formData: {
        price: '',
        num: ''
      }
    }
  },
  created() {
    this.onRefreshClick();
    this.timer = setInterval(() => {
      this.onRefreshClick();
    }, 5000)
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    async onRefreshClick(action){
      const result = await getBiddingMaxPrice(this.$route.query.id)
      this.maxPrice = result.data;
      if(action){
       this.$message.success(result.msg)
      }
    },
    async onSubmit() {
      const params = {...this.formData, id: this.data.id}
      if(!params.num){
        return this.$message.warning('请填写数量')
      }
      if(Number(params.price) < Number(this.data.baseUnitPrice)){
        return this.$message.warning('报价的价格应大于等于拍卖底价')
      }
      //普通竞价商品 报价的数量应是最小购买量的正整数倍
      if(String(this.data.type) === '1' && Number(params.num) % Number(this.data.minNum) !== 0 ){
        return this.$message.warning('报价的数量应是最小购买量的正整数倍')
      }
      const result = await saveBiddingOffer(params);
      if(result.code === 200){
        this.$message.success(result.msg);
      }else{
        this.$message.error(result.msg);
      }
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
    .sub-button{
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
