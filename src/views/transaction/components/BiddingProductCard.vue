<template>
  <div class="bidding-product">
    <img :src="data.img || require('@images/null-bid.png')" alt="">
    <div class="info-list-box">
      <h6>{{data.companyName}}</h6>
      <ul class="info-list">
        <li>
          <span class="title">商品名称：</span>
          <span>{{data.goodsName}}</span>
        </li>
        <li>
          <span class="title">竞价方式：</span>
          <span>{{methodText}}</span>
        </li>
        <li>
          <span class="title">竞价类型：</span>
          <span>{{typeText}}</span>
        </li>
        <li>
          <span class="title">竞价总量：</span>
          <span>{{data.goodsNum}}{{data.unit}}</span>
        </li>
        <li>
          <span class="title" v-if="String(data.type) === '1'">最小购买量：</span>
          <span>{{data.minNum}}</span>
        </li>
        <li>
          <span class="title">延时规则：</span>
          <span>允许延时，当结束时间小于{{data.expendTime}}分钟时触发（正常延时3分钟）</span>
        </li>
        <li>
          <span class="title">竞价起止时间：</span>
          <span>{{data.startTime}}-{{data.endTime}}</span>
        </li>
        <li>
          <span class="title">底价单价：</span>
          <span>{{data.baseUnitPrice}}</span>
        </li>
        <li>
          <span class="title">加价幅度：</span>
          <span>{{data.increasePrice}}</span>
        </li>
        <li>
          <span class="title">供应商联系电话：</span>
          <span>{{data.contact}}{{data.supplierTel}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {BIDDING_METHOD, BIDDING_TYPE, getLabelByValue} from "@utils/const";

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    methodText(){
      return getLabelByValue(this.data.method, BIDDING_METHOD)
    },
    typeText(){
      return getLabelByValue(this.data.type, BIDDING_TYPE)
    }
  }
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
        margin-bottom: 6px;
      }
      .title{
        color: #333333;
        font-weight: bold;
      }
    }
  }
</style>
