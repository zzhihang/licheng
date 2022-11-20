<template>
  <el-card class="more-news-card">
    <h4>{{title}}</h4>
    <h5 v-if="subTitle" class="ellipsis2">{{subTitle}}</h5>
    <p v-if="time">{{time}}</p>
    <div class="action-box">
      <el-button type="text">查看详情<i class="el-icon-arrow-right"></i></el-button>
      <span class="view-num" v-if="pv !== ''"><i class="el-icon-view"></i>{{pv}}</span>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    pv: {
      type: [Number, String],
      default: 0
    },
  },
}
</script>

<style lang="scss" scoped>
.more-news-card{
  font-size: 14px;
  cursor: pointer;
  h4{
    color: #333333;
    line-height: 22px;
    font-size: 16px;
  }
  h5{
    color: #333333;
    margin-top: 14px;
  }
  p{
    color: #999999;
    line-height: 20px;
  }
  .action-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    i{
      margin-right: 4px;
    }
    .el-button{
      font-size: 16px;
    }
  }
}
</style>
