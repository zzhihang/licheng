<template>
  <div class="w">
    <floor-title title="综合研究"></floor-title>
    <el-row style="margin-top: 30px;">
      <el-col :span="8" v-for="(o, index) in 3" :key="index">
        <complex-study-card :type="index === 0 ? 'primary' : ''"></complex-study-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import FloorTitle from "@/views/components/home/FloorTitle";
import ComplexStudyCard from "@/views/components/home/ComplexStudyCard";

export default {
  components: {
    FloorTitle,
    ComplexStudyCard
  },
}
</script>

<style lang="scss" scoped>
.auction-card{
  margin-top: 30px;
}
</style>
