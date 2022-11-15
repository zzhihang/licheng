<template>
  <div>
    <news-list-card v-for="(item, index) in data"
                    :content="item.content"
                    :cover="item.cover"
                    :title="item.title"
                    :time="item.postTime"
                    :key="index">

    </news-list-card>
    <el-pagination
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import Vue from 'vue';
import NewsListCard from "@/views/components/news/NewsListCard";
import {newCenterList} from "@/api/news/news";

export default {
  components: {
    NewsListCard
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
    async getList() {
      const {rows} = await newCenterList({newsType: 1});
      this.data = rows;
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
