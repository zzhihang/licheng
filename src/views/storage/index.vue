<template>
  <publish-list :url="service" @onCardClick="onCardClick"></publish-list>
</template>

<script>
import Vue from 'vue';
import PanelContainer from "@components/mine/PanelContainer/PanelContainer";
import PublishList from "@views/logistics/components/PublishList";

export default {
  components: {
    PublishList,
    PanelContainer
  },
  data() {
    return {
      service: ''
    }
  },
  created() {
    if(this.$route.path === '/storage/goods-find-warehouse'){
      this.service = '/goodsFindWarehouse/indexList'
    }else{
      this.service = '/warehouseFindGoods/indexList'
    }
  },
  methods: {
    onCardClick(id) {
      this.$router.push(`${this.$route.path}/${id}`)
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
