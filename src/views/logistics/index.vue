<template>
  <publish-list :url="service" @onCardClick="onCardClick"></publish-list>
</template>

<script>
import Vue from 'vue';
import PublishList from "@views/logistics/components/PublishList";
import {NEWS_CLASS} from "@utils/const";

export default {
  components: {
    PublishList,
  },
  data() {
    return {
      service: '/index/logistics/goodsFindCar',
      type: NEWS_CLASS.GOODS_FIND_CAR
    }
  },
  created() {
    if(this.$route.path === '/logistics/car-find-goods'){
      this.service = '/index/logistics/carFindGoods'
      this.type = NEWS_CLASS.CAR_FIND_GOODS
    }else{
      this.service = '/index/logistics/goodsFindCar'
      this.type = NEWS_CLASS.GOODS_FIND_CAR
    }
  },
  methods: {
    onCardClick(id) {
      this.$router.push(`/logistics/${id}?type=${this.type}`)
    }
  },
}
</script>

<style lang="scss" scoped>
.news-center{
  display: flex;
  padding-top: 30px;
  padding-bottom: 240px;
}
.menu-panel{
  margin-left: 40px;
  flex: 1;
  h4{
    color: #333333;
    font-size: 24px;
    line-height: 33px;
  }
}
</style>
