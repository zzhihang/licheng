<template>
  <div class="news-detail-content w">
    <more-news-list :data="hotList"
                    title="热门资讯"
                    @onMoreCardClick="onMoreCardClick"
                    style="flex-shrink: 0"
    />
    <news-detail
      :title="data.title"
      :pv="data.pv"
      :html="data.content"
      :time="data.createTime"
      :prev="prev"
      :next="next"
      style="margin-left: 40px; flex: 1"
    ></news-detail>
  </div>
</template>

<script>
import Vue from 'vue';
import NewsDetail from "@views/news/components/NewsDetail";
import {getNewsDetail, getNewsHotList} from "@/api/news/news";
import MoreNewsList from "@views/logistics/components/MoreNewsList";

export default {
  components: {
    NewsDetail,
    MoreNewsList
  },
  data() {
    return {
      data: {},
      hotList: [],
      next: '',
      prev: ''
    }
  },
  created(){
    getNewsDetail(this.$route.params.id).then((result) => {
      if(result.code === 200){
        this.data = result.data.news;
        if(result.data.prev){
          this.prev = result.data.prev.id;
        }
        if(result.data.next){
          this.next = result.data.next.id;
        }

      }
    })
    getNewsHotList().then(result => {
      this.hotList = result.rows.filter(item => String(item.id) !== String(this.$route.params.id)).slice(0, 5)
    })
  },
  methods: {
    onMoreCardClick({id}) {
      this.$router.push({path: `/news/${id}`})
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
