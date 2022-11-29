<template>
  <el-card class="auction-card">
    <div class="info-list">
      <h6 class="title"><span class="ellipsis1">{{data.companyName}}</span></h6>
      <div class="info-list-item" v-for="(item, index) in config" :key="index">
        <span class="title">{{item.title}}:</span>
        <span class="info" v-if="item.render">{{item.render(data)}}</span>
        <span class="info" v-else>{{data[item.field]}}</span>
      </div>
    </div>
    <el-button type="primary" size="large" @click="$router.push({path: '/transaction/bidding/detail', query:{id: data.id}})">查看详情</el-button>
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
      config: [{
        title: '商品名称',
        field: 'goodsName'
      },{
        title: '底价单价',
        field: 'baseUnitPrice',
        render: (data) => {
          return data.baseUnitPrice + data.unit;
        }
      },{
        title: '竞价总量',
        field: 'num'
      },{
        title: '竞价类型',
        field: 'method'
      },{
        title: '竞价开始时间',
        field: 'startTime'
      },{
        title: '竞价结束时间',
        field: 'endTime'
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
.auction-card {
  width: 447px;
  ::v-deep .el-card__body{
    padding: 0;
  }
  h6 {
    color: #333333;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
  }
  .el-button{
    width: 100%;
  }
}

.info-list {
  padding: 24px;
  background-size: 96px 122px;
  background: url('../../../assets/images/bidding-bg.png') no-repeat 327px 12px;

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
