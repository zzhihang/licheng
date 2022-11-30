<template>
  <div class="card-list">
    <h2>
      <span>物流服务</span>
      <img :src="require('../../../assets/icons/img/mofang.png')" alt="">
    </h2>
    <ul>
      <li v-for="(item, index) in data" :key="index"
          @click="$router.push({path: `/logistics/${item.id}`})">
        <div class="content ellipsis1">{{item.title}}</div>
        <span class="time">
          <p>{{item.postTime}}</p>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import {getHomeLogisticsList} from "@/api/logistics/logistics";

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
      const {rows} = await getHomeLogisticsList()
      this.data = rows;
    }
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  border-radius: 8px;
  overflow: hidden;
  h2 {
    color: #FFFFFF;
    line-height: 77px;
    padding: 0 24px;
    background: #5086F5;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 77px;
    img{
      width: 113px;
      height: 64px;
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
      &:before{
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #FDAF3F;
        border-radius: 100%;
      }
      .time{
        margin-left: 30px;
        flex-shrink: 0;
        text-align: center;
        p{
          font-size: 18px;
          margin-top: 2px;
          color: #666666;
        }
      }
      .content{
        color: #333333;
        flex: 1;
        padding-left: 9px;
        font-weight: bold;
      }
    }
  }
}
</style>
