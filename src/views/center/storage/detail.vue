<template>
  <div class="w">
    <preview-render :list="list"
                    :data-source="dataSource"
                    @onCollectClick="onCollectClick"
    ></preview-render>
  </div>
</template>

<script>
import Vue from 'vue';
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {addFavorite} from "@/api/favorite/favorite";
import {getGoodsFindWarehouse, getWarehouseFindGoods} from "@/api/storage/storage";
import {WAREHOUSE_FIND_GOODS_MODEL, GOODS_FIND_WAREHOUSE_MODEL} from "@views/center/storage/publish/model/model";
import {NEWS_CLASS} from "@utils/const";

export default {
  components: {
    PreviewRender,
  },
  data() {
    return {
      list: WAREHOUSE_FIND_GOODS_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.service = getWarehouseFindGoods;
    this.favoriteType = 0
    this.id = this.$route.params.id
    this.type = this.$route.query.type
    if(this.$route.query.type === String(NEWS_CLASS.GOODS_FIND_WAREHOUSE)){
      this.service = getGoodsFindWarehouse;
      this.favoriteType = 1
      this.list = GOODS_FIND_WAREHOUSE_MODEL;
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
