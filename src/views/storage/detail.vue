<template>
  <div class="w">
    <preview-render :list="list"
                    :data-source="dataSource"
                    :show-collect="true"
                    @onCollectClick="onCollectClick"
    ></preview-render>
  </div>
</template>

<script>
import Vue from 'vue';
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {CAR_FIND_GOODS_MODEL, GOODS_FIND_CAR_MODEL} from "@views/center/logistics/publish/model/model";
import {getCarFindGoods, getGoodsFindCar} from "@/api/logistics/logistics";
import {addFavorite} from "@/api/favorite/favorite";
import {getGoodsFindWarehouse} from "@/api/storage/storage";

export default {
  components: {
    PreviewRender,
  },
  data() {
    return {
      list: CAR_FIND_GOODS_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.service = getWarehouseFindGoods;
    this.favoriteType = 0
    this.id = this.$route.params.id
    if(this.$route.path.includes('/storage/goods-find-warehouse')){
      this.service = getGoodsFindWarehouse;
      this.favoriteType = 1
      this.list = GOODS_FIND_CAR_MODEL;
    }
    this.getData()
  },
  methods: {
    async getData() {
      const {data} = await this.service(this.id)
      this.dataSource = data;
    },
    async onCollectClick(){
      const result = await addFavorite({businessId: this.id, favoriteType: this.favoriteType})
      if(result.code === 200){
        this.$message.success(result.msg)
      }else{
        this.$message.error(result.msg)
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
