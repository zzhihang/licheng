<template>
  <div class="home w">
    <div class="banner-area w">
      <el-carousel>
        <el-carousel-item v-for="(item, index) in policy" :key="index" @click.native="onCarouselClick(item)">
          <img :src="item.cover" alt="">
          <p class="c-title">{{item.title}}</p>
        </el-carousel-item>
      </el-carousel>
      <user-panel></user-panel>
    </div>
    <auction-transaction class="floor-item"></auction-transaction>
    <delisted-transaction class="floor-item"></delisted-transaction>
    <industry-news class="floor-item" :data="industry"></industry-news>
    <complex-study class="floor-item" :data="research"></complex-study>
    <ware-service class="floor-item"></ware-service>
    <supply-service class="floor-item"></supply-service>
  </div>
</template>

<script>
import Vue from 'vue';
import UserPanel from "@/views/components/home/UserPanel";
import AuctionTransaction from "@views/components/home/AuctionTransaction";
import DelistedTransaction from "@views/components/home/ListedTransaction";
import IndustryNews from "@/views/components/home/IndustryNews";
import ComplexStudy from "@/views/components/home/ComplexStudy";
import WareService from "@views/components/home/WareService";
import SupplyService from "@views/components/home/SupplyService";
import {getHomeNewsList} from "@/api/news/news";

export default {
  components: {
    UserPanel,
    AuctionTransaction,
    DelistedTransaction,
    IndustryNews,
    ComplexStudy,
    WareService,
    SupplyService,
  },
  data() {
    return {
      industry: [],
      policy: [],
      research: [],
    }
  },
  created(){
    this.getData()
  },
  methods: {
    async getData() {
      const result = await getHomeNewsList();
      this.industry = result.data.industry
      this.policy = result.data.policy
      this.research = result.data.research
    },
    onCarouselClick(data){
      this.$router.push({path: `/news/${data.id}`})
    }
  },
}
</script>

<style lang="scss" scoped>

.banner-area{
  margin-top: 20px;
  display: flex;
}

.el-carousel{
  position: relative;
  width: 920px;
  height: 342px;
  ::v-deep .el-carousel__container{
    height: 100%;
  }
  img{
    height: 100%;
    width: 100%;
  }
  .c-title{
    position: absolute;
    bottom: 0;
    height: 40px;
    padding: 0 15px;
    background: rgb(201 197 197 / 90%);
    line-height: 40px;
    width: 100%;
    color: #ffffff;
  }
}

.floor-item{
  padding-top: 60px;
  padding-bottom: 50px;
}
</style>
