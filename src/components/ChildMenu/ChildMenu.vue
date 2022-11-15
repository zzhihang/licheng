<template>
  <div class="child-menu">
    <ul>
      <li>
        {{title}}
      </li>
      <li v-for="(item, index) in list" :key="index">{{item.title}}</li>
    </ul>
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
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .child-menu{
    width: 245px;
    box-shadow: 0 0 8px 1px #E9EBED;
    border-radius: 8px;
    border: 1px solid #E7E9EB;
    li{
      display: block;
      height: 56px;
      background: #FFFFFF;
      border-bottom: 1px solid #E7E9EB;
      text-align: center;
      line-height: 56px;
      color: #333333;
      font-size: 16px;
      &.active{
        color: #FFFFFF;
        background: #2468F2;
      }
    }
  }
</style>
