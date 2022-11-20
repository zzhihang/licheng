<template>
  <news-detail
    :title="data.title"
    :pv="data.pv"
    :html="data.content"
    :time="data.createTime"
  ></news-detail>
</template>

<script>
import Vue from 'vue';
import NewsDetail from "@views/news/components/NewsDetail";
import {getNewsDetail} from "@/api/news/news";

export default {
  components: {
    NewsDetail
  },
  data() {
    return {
       data: {}
    }
  },
  created(){
   getNewsDetail(this.$route.params.id).then((result) => {
     if(result.code === 200){
       this.data = result.data.news;
     }
   })
  }
}
</script>

<style lang="scss" scoped>

</style>
