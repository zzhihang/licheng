<template>
 <div style="background: #FFFFFF">
   <div class="w">
     <floor-title :show-more="true" title="竞价交易" @onMoreClick="$router.push({path: '/transaction/bidding'})"></floor-title>
     <el-row :gutter="30">
       <el-col :span="8" v-for="(item, index) in data" :key="index">
         <auction-transaction-card :data="item"/>
       </el-col>
     </el-row>
   </div>
 </div>
</template>

<script>
import FloorTitle from "@/views/components/home/FloorTitle";
import AuctionTransactionCard from "@/views/components/home/AuctionTransactionCard";
import {getHomeBidingList} from "@/api/bidding/bidding";
import {BIDDING_TYPE, getLabelByValue} from "@utils/const";

export default {
  components: {
    FloorTitle,
    AuctionTransactionCard
  },
  data() {
    return {
      data: []
    }
  },
  created(){
    this.getData()
  },
  methods: {
    async getData() {
      const result = await getHomeBidingList();
      this.data = result.rows;
      this.data.forEach(item => {
        item.type = getLabelByValue(item.type, BIDDING_TYPE)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .auction-card{
    margin-top: 30px;
  }
</style>
