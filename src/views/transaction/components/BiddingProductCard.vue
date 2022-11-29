<template>
  <div class="bidding-product">
    <img :src="require('@images/jingjia.png')" alt="">
    <div class="info-list-box">
      <h6>山东大宗玉米实业有限公司备份</h6>
      <ul class="info-list">
        <li>
          <span class="title">商品名称：</span>
          <span>玉米</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
}
</script>

<style lang="scss" scoped>
  .bidding-product{
    padding: 30px 24px 144px;
    height: 454px;
    display: flex;
    img{
      width: 300px;
      height: 224px;
      border-radius: 6px;
    }
    .info-list-box{
      padding-left: 24px;
      h6{
        margin-bottom: 16px;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: #333333;
      }
    }
    .info-list{
      li{
        line-height: 22px;
        font-size: 14px;
        color: #444444;
      }
      .title{
        color: #333333;
        font-weight: bold;
      }
    }
  }
</style>
