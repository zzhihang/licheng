<template>
  <el-card class="rank-list" body-style="padding: 0">
    <h3 class="title">
      <img :src="require('@images/rank.png')" alt="">
      <span>排行榜</span>
    </h3>
    <el-table
      :data="data"
      style="width: 100%"
      :empty-text="isOpen ? '暂无数据' : '竞价未开始'"
    >
      <el-table-column
        prop="rank"
        header-align="center"
        align="center"
        label="排名">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="竞拍单价">
      </el-table-column>
      <el-table-column
        prop="num"
        header-align="center"
        align="center"
        label="数量">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
  .rank-list{
    padding: 24px;
    background: #ffffff;
    width: 346px;
    height: 270px;
    img{
      width: 22px;
      margin-right: 5px;
    }
    h3.title{
      font-size: 16px;
      color: #1D2129;
      font-weight: bold;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    ::v-deep .el-table th.el-table__cell{
      background: #F2F3F5 !important;
    }
  }
</style>
