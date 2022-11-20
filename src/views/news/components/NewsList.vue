<template>
  <div>
    <news-list-card v-for="(item, index) in data"
                    :content="item.content"
                    :cover="item.cover"
                    :title="item.title"
                    :time="item.postTime"
                    :key="index"
                    @click.native="onCardClick(item)"
                    style="margin-bottom: 20px;"
    >

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
import {getLastPath} from '@utils/utils'

const typeMap = {
  policy: 1,
  industry: 2,
  study: 3,
}

export default {
  components: {
    NewsListCard,
    MyPager
  },
  data() {
    return {
      data: [],
      pageNum: 1
    }
  },
  created() {
    this.getList();
  },
  methods: {
    onCardClick(data){
      this.$router.push({
        path: `/news/${data.id}`
      })
    },
    onPageChange(pageNum){
      this.pageNum = pageNum;
      this.getList()
    },
    async getList() {
      const type = getLastPath(this.$route.path)
      const {rows} = await newCenterList({newsType: typeMap[type], pageNum: this.pageNum});
      this.data = rows;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
