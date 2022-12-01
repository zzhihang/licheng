<template>
  <el-card class="auction-card" @click.native="$router.push({path: '/transaction/bidding/detail', query: {id: data.id}})">
    <img :src="data.img || require('@images/null-bid.png')" class="image">
    <div>
      <div class="info-list">
        <h6 class="title"><span class="ellipsis1">{{data.companyName}}</span><el-button type="primary" size="mini">进行中</el-button></h6>
        <div class="info-list-item" v-for="(item, index) in config" :key="index">
          <span class="title">{{item.title}}:</span>
          <span class="info" v-if="item.render">{{item.render(data)}}</span>
          <span class="info" v-else>{{data[item.field]}}</span>
        </div>
      </div>
    </div>
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
        field: 'goodsNum'
      },{
        title: '竞价类型',
        field: 'type'
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
  cursor: pointer;
  img{
    width: 380px;
    height: 200px;
  }
  ::v-deep .el-card__body{
    padding: 0;
  }
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
  padding: 20px;
  background-size: 380px 396px;
  background: url('../../../assets/images/at-card.png') no-repeat bottom;

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
