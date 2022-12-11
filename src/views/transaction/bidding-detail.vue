<template>
  <div class="bidding-detail">
    <div class="w">
      <div class="bidding-floor actions">
        <div style="flex: 1;background: #ffffff">
          <h1 class="title-box">竞价商品详情</h1>
          <bidding-product-card :data="model"></bidding-product-card>
        </div>
        <div style="flex-shrink: 0;margin-left: 30px;">
          <rank-list :data="rankList" :is-open="isOpen"></rank-list>
          <bidding-action-card :is-open="isOpen" :is-finish="isFinish" :data="model"
                               :distance="startDistance"
                               :qualified="model.qualified"
                               style="margin-top: 20px;"></bidding-action-card>
        </div>
      </div>

      <div class="bidding-floor">
        <h1 class="title-box">我的竞价记录</h1>
        <el-card body-style="padding: 0" style="margin-top: 20px;">
          <my-bidding-record :data="userBiddingList"/>
        </el-card>
      </div>

      <div class="bidding-floor">
        <h1 class="title-box">竞价活动介绍</h1>
        <div class="floor-content">
          {{ model.introduction || '暂无竞价活动介绍' }}
          <!--        <div class="floor-content-item">-->
          <!--          <span class="intro-title">指标：</span>-->
          <!--          <span class="intro-content">如有质量问题双方共同协商解决</span>-->
          <!--        </div>-->
          <!--        <div class="floor-content-item">-->
          <!--          <span class="intro-title">指标：</span>-->
          <!--          <span class="intro-content">如有质量问题双方共同协商解决</span>-->
          <!--        </div>-->
          <!--        <div class="floor-content-item">-->
          <!--          <span class="intro-title">指标：</span>-->
          <!--          <span class="intro-content">如有质量问题双方共同协商解决</span>-->
          <!--        </div>-->
        </div>
      </div>

      <div class="bidding-floor">
        <h1 class="title-box">竞价规则</h1>
        <div class="floor-content">
          <bidding-rule :type="model.type"></bidding-rule>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import RankList from "@views/transaction/components/RankList";
import BiddingActionCard from "@views/transaction/components/BiddingActionCard";
import BiddingProductCard from "@views/transaction/components/BiddingProductCard";
import BiddingRule from "@views/transaction/components/BiddingRule";
import DataTable from "@components/DataTable/DataTable";
import {getBiddingInfo} from "@/api/bidding/bidding";
import MyBiddingRecord from "@views/transaction/components/MyBiddingRecord";

export default {
  components: {
    RankList,
    BiddingActionCard,
    BiddingProductCard,
    DataTable,
    BiddingRule,
    MyBiddingRecord
  },
  data() {
    return {
      model: {},
      rankList: [],
      userBiddingList: [],
      isOpen: false,
      isFinish: false,
      startDistance: 0,
      endDistance: 0
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const result = await getBiddingInfo(this.$route.query.id);
      if (result.code === 200) {
        this.model = result.data;
        this.rankList = result.data.rankList;
        this.userBiddingList = result.data.userBiddingList;
        this.startDistance = new Date(result.data.startTime) - new Date().getTime();
        this.endDistance = new Date(result.data.endTime) - new Date().getTime();
        if (this.startDistance < 0) {
          this.isOpen = true;
          if (this.endDistance < 0) {
            this.isFinish = true;
          }else{
            this.startDistance = this.endDistance
          }
        }

      }
    }
  },
}
</script>

<style lang="scss" scoped>
.bidding-detail {
  padding: 36px;
  background: #F6F8FA;
}

.title-box {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background: #EBECF0;
  border-radius: 8px;
  overflow: hidden;
}

.bidding-floor {
  margin-bottom: 61px;

  &.actions {
    display: flex;
  }

  .floor-content {
    margin-top: 21px;
    border-radius: 8px;
    overflow: hidden;
    padding: 24px 22px;
    background: #ffffff;
  }
}

.intro-title {
  font-weight: bold;
  color: #333333;
  line-height: 22px;
  font-size: 16px;
}

.floor-content-item {
  margin-top: 16px;
}

.intro-content {
  font-size: 14px;
}

</style>
