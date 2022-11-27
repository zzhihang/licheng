<template>
  <el-card class="listing-card" body-style="padding: 0">
    <img :src="data.img" alt="">
    <div class="content">
      <h2>
        <span>{{data.goodsName}}</span>
        <el-tag
          type="warning"
          effect="plain"
          size="small"
        >
          {{ data.status }}
        </el-tag>
      </h2>
      <p>截止时间：{{data.listingEndTime}}</p>
    </div>
    <el-button type="primary" size="large" @click="$router.push({path: `/transaction/listing/${data.id}`})">查看详情</el-button>
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
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
  .listing-card{
    width: 291px;
    height: 312px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0;
    h2{
      color: #333333;
      line-height: 22px;
      font-size: 16px;
    }
    p{
      color: #666666;
      line-height: 20px;
      font-size: 14px;
    }
    img{
      width: 291px;
      height: 170px;
    }
    .content{
      padding: 24px;
    }
    .el-button{
      width: 100%;
    }
    .el-tag{
      margin-left: 10px;
    }
  }
</style>
