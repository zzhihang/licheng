<template>
  <div class="floor-title">
    <h3>
      <span>{{title}}</span>
    </h3>
    <p v-if="showMore" @click="$emit('onMoreClick')">查看更多<i class="el-icon-arrow-right"></i></p>
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
    showMore: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
  .floor-title{
    h3{
      font-size: 28px;
      color: #333333;
      text-align: center;
      position: relative;
      line-height: 41px;
      span{
        position: relative;
        &:after{
          content: '';
          display: block;
          position: absolute;
          bottom: -10px;
          width: 48px;
          left: 50%;
          margin-left: -24px;
          height: 4px;
          background: linear-gradient(270deg, #4AA1FA 0%, #2468F2 100%);
          border-radius: 2px;
        }
      }
    }
    p{
      font-size: 16px;
      color: #2468F2;
      text-align: right;
      cursor: pointer;
    }
  }
</style>
