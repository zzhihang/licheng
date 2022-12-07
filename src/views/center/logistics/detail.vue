<template>
  <preview-render :list="list"
                  :data-source="dataSource"
  ></preview-render>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {NEWS_CLASS} from "@utils/const";
import {CAR_FIND_GOODS_MODEL, GOODS_FIND_CAR_MODEL} from "@views/center/logistics/publish/model/model";
import {getCarFindGoods, getGoodsFindCar} from "@/api/logistics/logistics";

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
    this.service = getCarFindGoods;
    this.favoriteType = 0
    this.id = this.$route.params.id
    this.type = this.$route.query.type
    if(this.$route.query.type === String(NEWS_CLASS.GOODS_FIND_CAR)){
      this.service = getGoodsFindCar;
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
  },
}
</script>

<style lang="scss" scoped>

</style>
