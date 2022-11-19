<template>
  <div class="w news-center">
    <panel-container title="资讯中心">
      <news-list></news-list>
    </panel-container>
  </div>
</template>

<script>
import Vue from 'vue';
import NewsList from "@views/news/components/NewsList";
import PanelContainer from "@components/mine/PanelContainer/PanelContainer";

export default {
  components: {
    NewsList,
    PanelContainer
  },
  data() {
    return {

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
