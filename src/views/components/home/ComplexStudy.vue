<template>
  <div class="w">
    <floor-title title="综合研究"></floor-title>
    <el-row style="margin-top: 30px;">
      <el-col :span="8" v-for="(item, index) in data" :key="index">
        <complex-study-card
          :type="index === 0 ? 'primary' : ''"
          :size="index >= 2 ? 'small' : 'large'"
          :data="item"
        ></complex-study-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import ComplexStudyCard from "@/views/components/home/ComplexStudyCard";
import {getHomeNewsList} from "@/api/news/news";

export default {
  components: {
    FloorTitle,
    ComplexStudyCard
  },
  data() {
    return {
      data: []
    }
  },
  created(){
    this.getData()
  },
  methods: {
    async getData() {
      const result = await getHomeNewsList();
      //TODO 取research
      this.data = result.data.policy
    }
  },
}
</script>

<style lang="scss" scoped>
.auction-card{
  margin-top: 30px;
}
</style>
