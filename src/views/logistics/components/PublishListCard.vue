<template>
  <div class="publish-card">
    <div class="info">
      <img :src="icon" alt="">
      <div>
        <h6>{{title}}</h6>
        <p>发布企业:{{company}}</p>
      </div>
    </div>
    <div class="time">发布时间:{{time}}</div>
  </div>
</template>

<script>
import Vue from 'vue';

const iconMap = new Map([
  [1, require('../../../assets/icons/img/car2goods.png')], //车找货
  [2, require('../../../assets/icons/img/goods2car.png')], //货找车
  [3, require('../../../assets/icons/img/czh.png')], //仓找或
  [4, require('../../../assets/icons/img/hzc.png')], //货找仓
])

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    cardType: {
      type: Number,
      default: 1
    }
  },
  computed: {
    icon(){
      return iconMap.get(this.cardType)
    }
  }
}
</script>

<style lang="scss" scoped>
  .publish-card{
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    padding: 20px 24px;
    border-radius: 8px;
    border: 1px solid #DEE3ED;
    cursor: pointer;
    img{
      width: 70px;
      height: 70px;
      border-radius: 100%;
      margin-right: 20px;
    }
    .info{
      display: flex;
      flex: 1;
      h6{
        color: #333333;
        line-height: 22px;
        font-weight: bold;
        font-size: 16px;
      }
      p{
        color: #666666;
        line-height: 20px;
        font-size: 14px;
        margin-top: 6px;
      }
    }
    .time{
      color: #666666;
      font-size: 14px;
      flex-shrink: 0;
    }
  }
</style>
