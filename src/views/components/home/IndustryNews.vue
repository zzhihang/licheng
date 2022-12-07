<template>
  <div style="background: #FFFFFF">
    <div class="w">
      <floor-title title="行业新闻"></floor-title>
      <el-carousel :interval="5000" :autoplay="true" @change="onCarouselChange" arrow="always">
        <el-carousel-item v-for="item in total" :key="item">
          <el-row style="margin-top: 30px;" :gutter="25">
            <el-col :span="6" v-for="(item, index) in getSliceData()" :key="index">
              <industry-news-card :data="item"></industry-news-card>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import FloorTitle from "@/views/components/home/FloorTitle";
import IndustryNewsCard from "@/views/components/home/IndustryNewsCard";

export default {
  components: {
    FloorTitle,
    IndustryNewsCard
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      total: 0,
      index: 0
    }
  },
  methods: {
    getSliceData(){
      return this.data.slice(this.index * 4, (this.index + 1) * 4)
    },
    onCarouselChange(e){
      this.index = e;
    }
  },
  watch: {
    data: {
      handler(val) {
        this.total = Math.ceil(this.data.length / 4)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
    ::v-deep .el-carousel__container{
      height: 410px;
    }

    ::v-deep .el-carousel__button{
      background: #2468F2;
      height: 14px;
      width: 14px;
      border-radius: 100%;
    }
</style>
