<template>
  <div>
    <h1 class="rule-title">普通竞价交易通用规则：</h1>
    <ul class="rules">
      <li v-for="(item, index) in rule" :key="index">{{item}}</li>
    </ul>
    <h1 class="rule-title">延时规则：</h1>
    <ul class="rules" style="list-style: none;">
      <li>若本场交易为“延时交易”，则触发延时规则</li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import {getAppList} from "@/api/common";

export default {
  props: {
    type: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      rule: [],
      rules1: [
        '竞拍按照价格优先，同等价格数量优先，同等价格同等数量报价时间优先的原则成交。',
        '报价规范：买方报价同时提报价格和数量。买方报价的价格应大于等于拍卖底价。买方报价的数量应是最小购买量的正整数倍。',
        '买方在单场交易中可多次报价，符合报价规范的每次报价均是有效报价。',
        '系统实时按照价格、数量、时间的依次统计“可成交报价”（如卖方货品共计1000吨，则按照价格、数量、时间的顺序依次排列买方报价，前1000吨成交为可成交报价，若在某个时刻有买方某个报价300吨中有200吨能够成交，则其中200吨为可成交报价）。',
        '竞价可分为“延时交易”和“非延时交易”。“延时交易”是在交易最后N分钟触发延时规则，则开始N分钟的倒计时，直至没有新的触发出现。“非延时交易”即达到约定公开的结束时间结束本场竞价交易，不因新的可成交报价出现而延时。',
        '卖方的全部或部分货品没有有效报价响应，则视为流拍。',
        '同一买方的多个有效报价均可成交，在单场交易中同一买方可形成多笔成交价。成交价按买方的每笔报价的实际价格成交。',
        '如活动介绍中有特殊说明，则以供货商的说明为准。',
      ],
      rules2: [
        '整拍竞价交易的买方对卖方的整批货物进行竞价报价，卖方货品的数量不可拆分。',
        '卖方应公布货品数量、拍卖底价、最小加价幅度。买方报价时提报价格，无须提报数量。',
        '报价规范：买方的报价应高于当前其他买方价格，加价幅度不得低于最小加价幅度。若目前市场无报价，买方报价不得低于卖方设置的拍卖底价。',
        '“市场报价”即符合报价规范的报价。',
        '每出现新的市场报价，前期报价全部作废。',
        '竞价可分为“延时交易”和“非延时交易”。“延时交易”是在交易最后N分钟触发延时规则，则开始N分钟的倒计时，直至没有新的触发出现。“非延时交易”即达到约定公开的结束时间结束本场竞价交易，不因新的可成交报价出现而延时。',
        '成交规则：以竞价交易结束时刻的市场报价为该批货品的成交价。',
        '卖方的货品没有市场报价响应，则视为流拍。',
        '如活动介绍中有特殊说明，则以供货商的说明为准。',
      ]
    }
  },
  watch: {
    type: {
      handler(val) {
        this.rule = this['rules' + String(val)]
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .rule-title{
    font-size: 16px;
    color: #333333;
    margin-bottom: 24px;
    font-weight: bold;
    &:before{
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #333333;
      border-radius: 100%;
      margin-right: 14px;
    }
  }

  .rules{
    list-style: auto;
    font-size: 14px;
    color: #333333;
    padding-left: 14px;
    li{
      margin-bottom: 24px;
    }
  }
</style>
