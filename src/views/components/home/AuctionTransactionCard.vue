<template>
  <el-card class="auction-card">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    <div>
      <h6 class="title"><span class="ellipsis1">山东大宗玉米实业有限公司</span><el-button type="primary" size="mini">进行中</el-button></h6>
      <div class="info-list">
        <div class="info-list-item" v-for="(item, index) in config" :key="index">
          <span class="title">{{item.title}}:</span>
          <span class="info">玉米</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  components: {},
  data() {
    return {
      config: [{
        title: '商品名称',
        field: 'name'
      },{
        title: '底价单位',
        field: 'name'
      },{
        title: '竞价总量',
        field: 'name'
      },{
        title: '竞价类型',
        field: 'name'
      },{
        title: '竞价开始时间',
        field: 'name'
      },{
        title: '竞价结束时间',
        field: 'name'
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
.auction-card {
  h6 {
    margin-top: 20px;
    color: #333333;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
  }
}

.info-list {
  .title {
    color: #333333;
  }

  .info {
    color: #666666;
    padding-left: 4px;
  }
}

.info-list-item{
  margin-top: 8px;
  font-size: 14px;
}

</style>
