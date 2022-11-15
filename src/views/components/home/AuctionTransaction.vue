<template>
 <div style="background: #FFFFFF">
   <div class="w">
     <floor-title :show-more="true" title="竞价交易"></floor-title>
     <el-row :gutter="30">
       <el-col :span="8" v-for="(item, index) in 6" :key="index">
         <auction-transaction-card />
       </el-col>
     </el-row>
   </div>
 </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import AuctionTransactionCard from "@/views/components/home/AuctionTransactionCard";

export default {
  components: {
    FloorTitle,
    AuctionTransactionCard
  },
}
</script>

<style lang="scss" scoped>
  .auction-card{
    margin-top: 30px;
  }
</style>
