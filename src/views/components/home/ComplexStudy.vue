<template>
  <div class="w">
    <floor-title title="综合研究"></floor-title>
    <el-row style="margin-top: 30px;border-radius: 8px;overflow:hidden;">
      <el-col :span="8" v-for="(item, index) in data" :key="index">
        <complex-study-card
          :type="index === 0 ? 'primary' : ''"
          :size="index >= 2 ? 'small' : 'large'"
          :data="item"
          :style="{background: index >= 2 ? index === 2 ? '#E5E8F1' : '#EBECF0' : ''}"
        ></complex-study-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FloorTitle from "@/views/components/home/FloorTitle";
import ComplexStudyCard from "@/views/components/home/ComplexStudyCard";

export default {
  components: {
    FloorTitle,
    ComplexStudyCard
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.auction-card{
  margin-top: 30px;
}
</style>
