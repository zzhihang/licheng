<template>
  <div class="news-detail-content w">
    <more-news-list :data="hotList"
                    title="更多资讯"
                    @onMoreCardClick="onMoreCardClick"
                    type="logistics"
                    style="flex-shrink: 0"
    />
    <preview-render :list="list"
                    :data-source="dataSource"
                    :show-collect="true"
                    @onCollectClick="onCollectClick"
                    style="margin-left: 40px; flex: 1"
    ></preview-render>
  </div>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {CAR_FIND_GOODS_MODEL, GOODS_FIND_CAR_MODEL} from "@views/center/logistics/publish/model/model";
import {
  getCarFindGoodsDetail2c,
  getCarFindGoodsList2c,
  getGoodsFindCarDetail2c,
  getGoodsFindCarList2c
} from "@/api/logistics/logistics";
import {addFavorite} from "@/api/favorite/favorite";
import {NEWS_CLASS} from "@utils/const";
import MoreNewsList from "@views/logistics/components/MoreNewsList";

export default {
  components: {
    PreviewRender,
    MoreNewsList
  },
  data() {
    return {
      list: CAR_FIND_GOODS_MODEL,
      dataSource: {},
      hotList: [],
    }
  },
  created() {

  },
  methods: {
    getData(){
      this.service = getCarFindGoodsDetail2c;
      this.moreService = getCarFindGoodsList2c
      this.favoriteType = NEWS_CLASS.CAR_FIND_GOODS
      this.id = this.$route.params.id
      if(String(this.$route.query.type) === String(NEWS_CLASS.GOODS_FIND_CAR)){
        this.service = getGoodsFindCarDetail2c;
        this.moreService = getGoodsFindCarList2c
        this.favoriteType = NEWS_CLASS.GOODS_FIND_CAR
        this.list = GOODS_FIND_CAR_MODEL;
      }
      this.getDetail()
      this.getMoreList()
    },
    async getDetail() {
      const {data} = await this.service(this.id)
      this.dataSource = data;
    },
    async getMoreList(){
      const {rows} = await this.moreService({});
      this.hotList = rows.filter(item => String(item.id) !== String(this.id)).slice(0, 5)
    },
    async onCollectClick(){
      const result = await addFavorite({businessId: this.id, favoriteType: this.favoriteType})
      if(result.code === 200){
        this.getData();
        this.$message.success(result.msg)
      }else{
        this.$message.error(result.msg)
      }
    },
    onMoreCardClick({id}){
      this.$router.push({path: `/logistics/${id}?type=${this.$route.query.type}`})
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.getData();
      },
      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
