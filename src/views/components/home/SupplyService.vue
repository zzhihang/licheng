<template>
  <div class="w">
    <floor-title title="供应链服务"></floor-title>
    <img src="" class="supply-service-img" alt="">
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
  .supply-service-img{
    width: 100%;
    height: 300px;
    margin-top: 30px;
  }
</style>
