<template>
  <el-card class="action-card" body-style="padding: 0">
    <h3 class="title">
      <img :src="require('@images/jingjia.png')" alt="">
      <span>竞价</span>
    </h3>
    <div class="card-content" v-if="!isFinish">
      <p class="count-down">{{countTitle}}：<count-down style="font-weight: bold;font-size: 14px" :time="distance"/></p>
      <div v-if="qualified">
        <div v-if="isOpen">
          <p class="current-price">当前最高价格：{{maxPrice}}元<el-button type="text" style="margin-left: 10px; padding: 0" @click="onRefreshClick(true)">刷新</el-button></p>
          <el-form :inline="true" :model="formData">
            <el-form-item label="价格">
              <el-input-number size="mini" :min="data.baseUnitPrice" :step="data.increasePrice" v-model="formData.price" placeholder="价格"></el-input-number>
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number size="mini" :min="data.minNum || 1" :step="data.minNum || 1" v-model="formData.num"  placeholder="数量"></el-input-number>
            </el-form-item>
          </el-form>
          <div style="text-align:center;" class="sub-button">
            <el-button type="primary" @click="onSubmit">提交竞价</el-button>
          </div>
        </div>
      </div>
      <div class="card-content" v-else>
        非常抱歉，您未取得竞拍资格，不能参与竞拍。
      </div>
    </div>
    <div class="card-content" v-else>
      竞价已结束
    </div>
  </el-card>
</template>

<script>
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
    //是否有资格
    qualified: {
      type: Boolean,
      default: false
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
        return this.$message.error('请填写数量')
      }
      if(Number(params.price) < Number(this.data.baseUnitPrice)){
        return this.$message.error('报价的价格应大于等于拍卖底价')
      }
      //普通竞价商品 报价的数量应是最小购买量的正整数倍
      if(String(this.data.type) === '1' && Number(params.num) % Number(this.data.minNum) !== 0 ){
        return this.$message.error('报价的数量应是最小购买量的正整数倍')
      }
      const result = await saveBiddingOffer(params);
      if(result.code === 200){
        this.$message.success(result.msg);
      }else{
        this.$message.error(result.msg);
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.formData.price = this.data.baseUnitPrice;
        this.formData.num = this.data.minNum;
      },
      immediate: true
    }
  },
  computed: {
    countTitle(){
      if(!this.isFinish){
        return '距离竞价结束时间'
      }
      if(!this.isOpen){
        return '距离竞价开始时间'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .action-card{
    width: 346px;
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
      padding: 12px 12px 15px 24px;
    }
    .count-down{
      font-size: 12px;
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
    ::v-deep .el-input-number--mini{
      width: 100px;
    }
  }
</style>
