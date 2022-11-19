<template>
  <div>
    <news-list-card v-for="(item, index) in data"
                    :content="item.content"
                    :cover="item.cover"
                    :title="item.title"
                    :time="item.postTime"
                    :key="index">

    </news-list-card>
    <my-pager @current-change="onPageChange">
    </my-pager>
  </div>
</template>

<script>
import Vue from 'vue';
import NewsListCard from "@views/news/components/NewsListCard";
import {newCenterList} from "@/api/news/news";
import MyPager from "@components/mine/MyPager/MyPager";

export default {
  components: {
    NewsListCard,
    MyPager
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    onPageChange(){

    },
    async getList() {
      const {rows} = await newCenterList({newsType: 1});
      this.data = rows;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
