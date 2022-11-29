<template>
  <div>
    <div class="bidding-floor actions">
      <div style="flex: 1">
        <h1 class="title-box">竞价商品详情</h1>
        <bidding-product-card></bidding-product-card>
      </div>
      <div style="flex-shrink: 0;margin-left: 30px;">
        <rank-list></rank-list>
        <bidding-action-card></bidding-action-card>
      </div>
    </div>

    <div class="bidding-floor">
      <h1 class="title-box">竞价商品详情</h1>
      <data-table ref="table" :columns="columns" url="/bidding/userPost" style="margin-top: 21px;"></data-table>
    </div>

    <div class="bidding-floor">
      <h1 class="title-box">竞价活动介绍</h1>
      <div class="floor-content">
        <div class="floor-content-item">
          <span class="intro-title">指标：</span>
          <span class="intro-content">如有质量问题双方共同协商解决</span>
        </div>
        <div class="floor-content-item">
          <span class="intro-title">指标：</span>
          <span class="intro-content">如有质量问题双方共同协商解决</span>
        </div>
        <div class="floor-content-item">
          <span class="intro-title">指标：</span>
          <span class="intro-content">如有质量问题双方共同协商解决</span>
        </div>
      </div>
    </div>

    <div class="bidding-floor">
      <h1 class="title-box">竞价规则</h1>
      <div class="floor-content">
        <bidding-rule></bidding-rule>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import RankList from "@views/transaction/components/RankList";
import BiddingActionCard from "@views/transaction/components/BiddingActionCard";
import BiddingProductCard from "@views/transaction/components/BiddingProductCard";
import BiddingRule from "@views/transaction/components/BiddingRule";
import {BIDDING_METHOD, BIDDING_TYPE, TRANSACTION_STATUS} from "@utils/const";
import DataTable from "@components/DataTable/DataTable";

export default {
  components: {
    RankList,
    BiddingActionCard,
    BiddingProductCard,
    DataTable,
    BiddingRule
  },
  data() {
    return {
      columns: [{
        name: '采购商',
        key: 'id',
        width: 80
      },{
        name: '竞拍单价',
        key: 'title',
      },{
        name: '数量',
        key: 'type',
        dict: BIDDING_TYPE
      },{
        name: '时间',
        key: 'method',
        dict: BIDDING_METHOD
      },{
        name: '状态',
        key: 'goodsName',
      },{
        name: '有效数量',
        key: 'goodsNum',
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
  .title-box{
    height: 64px;
    line-height: 64px;
    padding: 0 24px;
    background: #EBECF0;
    border-radius: 8px;
    overflow: hidden;
  }
  .bidding-floor{
    margin-bottom: 61px;
    &.actions{
      display: flex;
    }
    .floor-content{
      margin-top: 21px;
      border-radius: 8px;
      overflow: hidden;
      padding: 24px 22px;
    }
  }

  .intro-title{
    font-weight: bold;
    color: #333333;
    line-height: 22px;
    font-size: 16px;
  }

  .floor-content-item{
    margin-top: 16px;
  }

  .intro-content{
    font-size: 14px;
  }

</style>
