<template>
  <div class="card-list">
    <h2>
      <span>仓储服务</span>
      <img :src="require('../../../assets/icons/img/yunduo.png')" alt="">
    </h2>
    <ul>
      <li v-for="(item, index) in data" :key="index" @click="$router.push({path: `/storage/${item.id}`})">
        <span class="time">
          <h6>{{getDay(item.postTime)}}</h6>
          <p>{{ getYear(item.postTime) }}</p>
        </span>
        <div class="content ellipsis1">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import {getHomeStorageList} from "@/api/storage/storage";

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const {rows} = await getHomeStorageList()
      this.data = rows;
    },
    getDay(date){
      return date.slice(5, 9)
    },
    getYear(date){
      return date.slice(0, 4)
    }
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  border-radius: 8px;
  overflow: hidden;
  h2 {
    color: #2468F2;
    line-height: 77px;
    padding: 0 24px;
    background: #E9EFFD;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 77px;
    img{
      height: 76px;
      width: 72px;
    }
  }
  ul{
    background: #F6F7FA;
    li{
      padding: 12px 24px;
      display: flex;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #DEE3ED;
      .time{
        flex-shrink: 0;
        color: #2468F2;
        text-align: center;
        h6{
          font-size: 24px;
        }
        p{
          font-size: 14px;
          margin-top: 2px;
        }
      }
      .content{
        color: #333333;
        flex: 1;
        padding-left: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
