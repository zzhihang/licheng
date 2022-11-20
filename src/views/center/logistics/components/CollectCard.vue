<template>
  <div class="card">
      <p class="ellipsis1">{{title}}</p>
      <span class="time">{{time}}</span>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['title', 'time']
}
</script>

<style lang="scss" scoped>
  .card{
    background: #F6F7FA;
    border-radius: 5px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 29px;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
    .time{
      font-size: 12px;
    }
  }
</style>
