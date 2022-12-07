<template>
  <div>
    <div class="news-detail">
      <h3>
        <span>{{title}}</span>
        <span class="nums"><i class="el-icon-view"></i>{{pv}}</span>
      </h3>
      <p class="time">发布时间：{{time}}</p>
      <div v-html="html" style="margin-top: 17px;"></div>
    </div>
    <div class="button-box">
      <el-button icon="el-icon-back" :disabled="!prev" @click="$router.push(`/news/${prev}`)">上一篇</el-button>
      <el-button style="margin-left: 120px;" :disabled="!next" @click="$router.push(`/news/${next}`)">下一篇<i style="margin-left: 10px" class="el-icon-right"></i></el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['html', 'title', 'time', 'pv', 'prev', 'next']
}
</script>

<style lang="scss" scoped>
  .news-detail{
    padding: 21px 24px;
    background: #F6F7FA;
    border-radius: 8px;
    border: 1px solid #DEE3ED;
    h3{
      line-height: 16px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(0,0,0,0.85);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nums{
        color: #ACB1C0;
        font-size: 12px;
        i{
          margin-right: 4px;
        }
      }
    }
    .time{
      margin-top: 8px;
      color: rgba(0,0,0,0.85);
      line-height: 12px;
      font-size: 12px;
    }
  }
  .button-box{
    margin-top: 40px;
    text-align: center;
  }
</style>
