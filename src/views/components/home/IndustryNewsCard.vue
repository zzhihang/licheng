<template>
  <el-card class="news-card">
    <img :src="data.cover" class="image">
    <div class="body">
      <h6>{{data.title}}</h6>
      <p class="ellipsis3">{{data.content}}</p>
      <div class="bottom">
        <span class="source">新华网</span>
        <el-button type="text" class="button">查看更多<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {

  },
}
</script>

<style lang="scss" scoped>
  .news-card{
    width: 280px;
    height: 322px;
    padding: 0;
    border-radius: 8px;
    ::v-deep .el-card__body{
      padding: 0;
    }
    img{
      width: 100%;
      height: 150px;
    }
    h6{
      color: #000000;
      font-size: 16px;
      font-weight: bold;
    }
    p{
      font-size: 14px;
      color: #666666;
      line-height: 21px;
      margin-top: 10px;
      margin-bottom: 16px;
      height: 63px;
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .source{
        font-size: 12px;
        color: #666666;
      }
    }
    .body{
      padding: 20px;
      height: 172px;
      background: linear-gradient(180deg, #FFFFFF 0%, #EBEDF1 100%);
    }
  }
</style>
