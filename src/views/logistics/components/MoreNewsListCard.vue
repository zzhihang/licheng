<template>
  <el-card class="more-news-card">
    <h4></h4>
    <h5></h5>
    <p></p>
    <el-button style="float: right; padding: 3px 0" type="text">查看详情<i class="el-icon-arrow-right"></i></el-button>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
}
</script>

<style lang="scss" scoped>
.more-news-card{
  font-size: 14px;
  h4{
    color: #333333;
    line-height: 22px;
    font-size: 16px;
  }
  h5{
    color: #333333;
  }
  p{
    color: #999999;
    line-height: 20px;
  }
}
</style>
