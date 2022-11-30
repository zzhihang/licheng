<template>
  <div class="home w">
    <div class="banner-area w">
      <el-carousel>
        <el-carousel-item v-for="item in carouselImg" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
      <user-panel></user-panel>
    </div>
    <auction-transaction class="floor-item"></auction-transaction>
    <delisted-transaction class="floor-item"></delisted-transaction>
    <industry-news class="floor-item"></industry-news>
    <complex-study class="floor-item"></complex-study>
    <ware-service class="floor-item"></ware-service>
    <supply-service class="floor-item"></supply-service>
  </div>
</template>

<script>
import Vue from 'vue';
import UserPanel from "@/views/components/home/UserPanel";
import AuctionTransaction from "@/views/components/home/AuctionTransaction";
import DelistedTransaction from "@views/components/home/ListedTransaction";
import IndustryNews from "@/views/components/home/IndustryNews";
import ComplexStudy from "@/views/components/home/ComplexStudy";
import WareService from "@views/components/home/WareService";
import SupplyService from "@views/components/home/SupplyService";

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
      carouselImg: [
        require('../assets/images/profile.jpg'),
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.banner-area{
  margin-top: 20px;
  display: flex;
}

.el-carousel{
  width: 920px;
  height: 342px;
  img{
    height: 100%;
    width: 100%;
  }
}

.floor-item{
  padding-top: 60px;
  padding-bottom: 50px;
}
</style>
