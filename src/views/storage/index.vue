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
      service: ''
    }
  },
  created() {
    if(this.$route.path === '/storage/goods-find-warehouse'){
      this.service = '/index/storage/goodsFindWarehouse'
      this.type = NEWS_CLASS.GOODS_FIND_WAREHOUSE
    }else{
      this.service = '/index/storage/warehouseFindGoods'
      this.type = NEWS_CLASS.WAREHOUSE_FIND_GOODS
    }
  },
  methods: {
    onCardClick(id) {
      this.$router.push(`/storage/${id}?type=${this.type}`)
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
