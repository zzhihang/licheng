<template>
  <el-card class="news-card">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    <div style="padding: 20px;">
      <h6>好吃的汉堡</h6>
      <p>阿里巴巴在美股价涨破100美元整数位心理关口，为2015年1月份以来首次出现阿里巴巴在美股价涨破100美元整...</p>
      <div class="bottom">
        <span class="source">新华网</span>
        <el-button type="text" class="button">查看更多<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
}
</script>

<style lang="scss" scoped>
  .news-card{
    width: 280px;
    height: 322px;
    padding: 0;
    ::v-deep .el-card__body{
      padding: 0;
    }
    img{
      width: 100%;
      height: 150px;
    }
    h6{
      color: #000000;
      font-size: 16px;
      font-weight: bold;
    }
    p{
      font-size: 14px;
      color: #666666;
      line-height: 21px;
      margin-top: 10px;
      margin-bottom: 16px;
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .source{
        font-size: 12px;
        color: #666666;
      }
    }
  }
</style>
