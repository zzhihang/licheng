<template>
  <div class="more-news-list">
    <div class="more-news-title">
      <span>{{title}}</span>
      <img :src="require('../../../assets/icons/img/yunduo.png')" alt="">
    </div>
    <more-news-list-card v-for="(item, index) in data"
                         v-bind="$attrs"
                         @click.native="onMoreCardClick(item)"
                         :key="index"
                         :time="type === 'news' ? '' : item.postTime"
                         :pv="type === 'news' ? item.pv : ''"
                         :title="item.title"
                         :sub-title="type === 'news' ? item.content : item.company"

    ></more-news-list-card>
  </div>
</template>

<script>
import Vue from 'vue';
import MoreNewsListCard from "@views/logistics/components/MoreNewsListCard";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '更多资讯'
    },
    type: {
      type: String,
      default: 'news'
    },
  },
  components: {
    MoreNewsListCard
  },
  methods: {
    onMoreCardClick(data) {
      this.$emit('onMoreCardClick', data)
    }
  },
}
</script>

<style lang="scss" scoped>
.more-news-list {
  width: 314px;
  .more-news-card{
    margin-top: 14px;
  }
}

.more-news-title {
  background: #2468F2;
  border-radius: 5px;
  position: relative;
  margin-bottom: 16px;
  width: 314px;
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  color: #FFFFFF;
  padding-left: 20px;

  img {
    width: 45px;
    position: absolute;
    right: 23px;
    top: 0;
  }
}
</style>
