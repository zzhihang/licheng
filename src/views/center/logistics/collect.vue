<template>
  <div>
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="货找车" name="1"></el-tab-pane>
      <el-tab-pane label="车找货" name="2"></el-tab-pane>
    </el-tabs>
    <div class="list" v-if="list.length">
        <collect-card v-for="(item, index) in list"
                      :key="index"
                      :title="item.title"
                      :time="item.postTime"
                      @click.native="onCardClick(item)"
                      style="margin-bottom: 10px;"
        ></collect-card>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>
  </div>
</template>

<script>
import CollectCard from "@views/center/logistics/components/CollectCard";
import {userFavoriteCarFindGoods, userFavoriteGoodsFindCar} from "@/api/logistics/logistics";

export default {
  components: {
    CollectCard
  },
  data() {
    return {
      active: '1',
      list: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let service = userFavoriteCarFindGoods
      if(this.active === '1'){
        service = userFavoriteGoodsFindCar;
      }
      const {rows} = await service({pageNum: 1})
      this.list = rows;
    },
    handleClick(e) {
      this.getList();
    },
    onCardClick(data){
      this.$router.push({path: '/center/storage/' + data.id, query: {type: data.type}})
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
