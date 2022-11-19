<template>
  <div>
    <div class="more-new-title">
      <span>更多咨询</span>
      <img :src="require('../../../assets/icons/img/yunduo.png')" alt="">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MoreNewsListCard from "@views/logistics/components/MoreNewsListCard";

export default {
  components: {
    MoreNewsListCard
  },
}
</script>

<style lang="scss" scoped>
  .more-new-title{
    background: #2468F2;
    border-radius: 5px;
    position: relative;
    img{
      width: 124px;
      height: 130px;
    }
  }
</style>
