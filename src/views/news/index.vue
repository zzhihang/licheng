<template>
  <news-list></news-list>
</template>

<script>
import Vue from 'vue';
import NewsList from "@views/news/components/NewsList";

export default {
  components: {
    NewsList,
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
