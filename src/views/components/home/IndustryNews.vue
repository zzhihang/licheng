<template>
  <div style="background: #FFFFFF">
    <div class="w">
      <floor-title title="行业新闻"></floor-title>
      <el-row style="margin-top: 30px;">
        <el-col :span="6" v-for="(o, index) in 4" :key="index">
          <industry-news-card></industry-news-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import IndustryNewsCard from "@/views/components/home/IndustryNewsCard";

export default {
  components: {
    FloorTitle,
    IndustryNewsCard
  },
}
</script>

<style lang="scss" scoped>
.auction-card{
  margin-top: 30px;
}
</style>
