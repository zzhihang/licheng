<template>
  <div class="news-card">
    <img :src="cover" alt="">
    <div class="news-content">
      <div>
        <h6 class="title">
          <span>{{title}}</span>
          <span class="view-num"><i class="el-icon-view"></i>{{pv}}</span>
        </h6>
        <p class="time">{{time}}</p>
        <p class="content ellipsis3">{{content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    cover: {
      type: String,
      default: ''
    },
    pv: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
  .news-card{
    padding: 24px;
    display: flex;
    background: #F6F7FA;
    border: 1px solid #DEE3ED;
    border-radius: 8px;
    cursor: pointer;

    img{
      width: 118px;
      height: 110px;
      border-radius: 4px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .news-content{
      margin-left: 16px;
      flex: 1;
      .time{
        color: rgba(0,0,0,0.85);
        font-size: 12px;
        margin-top: 10px;
      }
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(0,0,0,0.85);
        font-weight: bold;
        font-size: 16px;
      }
      .content{
        line-height: 20px;
        font-size: 14px;
        color: #666666;
        margin-top: 12px;
      }
    }
    .view-num{
      font-size: 12px;
      color: #ACB1C0;
      display: inline-flex;
      align-items: center;
      i{
        margin-right: 4px;
      }
      img{
        height: 14px;
        width: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
