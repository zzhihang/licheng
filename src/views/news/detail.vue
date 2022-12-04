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

  },
  methods: {
    getData(){
      this.getDetail();
      this.getMore();
    },
    getMore(){
      getNewsHotList().then(result => {
        this.hotList = result.rows.filter(item => String(item.id) !== String(this.$route.params.id)).slice(0, 5)
      })
    },
    getDetail(){
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
    },
    onMoreCardClick({id}) {
      this.$router.push({path: `/news/${id}`})
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.getData();
      },
      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
