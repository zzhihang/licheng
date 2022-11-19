<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="货找仓" name="first">货找仓</el-tab-pane>
      <el-tab-pane label="仓找货" name="second">仓找货</el-tab-pane>
    </el-tabs>
    <div class="list">
      <collect-card v-for="(item, index) in list"
                    :key="index"
                    :title="item.title"
                    :time="item.createTime"
      ></collect-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CollectCrd from "@views/center/logistics/components/CollectCrd";
import {userFavoriteWarehouseFindGoods} from "@/api/storage/storage";

export default {
  components: {
    CollectCrd
  },
  data() {
    return {
      activeName: 'first',
      list: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const {data} = await userFavoriteWarehouseFindGoods({pageNum: 1})
    },
    handleClick(e) {

    }
  },
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-tabs__header{
    background: #F6F7FA;
    border-radius: 5px;
    padding: 2px 37px;
    .el-tabs__nav-wrap::after{
      background: none;
    }
  }
</style>
