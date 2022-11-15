<template>
  <div class="w news-center">
    <child-menu title="资讯中心" :list="list"></child-menu>
    <div class="menu-panel">
      <h4>最新资讯</h4>
      <news-list></news-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ChildMenu from "@components/ChildMenu/ChildMenu";
import NewsList from "@/views/components/news/NewsList";

export default {
  components: {
    ChildMenu,
    NewsList
  },
  data() {
    return {
      list: [{
        title: '政策文件',
      },{
        title: '行业新闻',
      },{
        title: '综合研究',
      }]
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
