<template>
  <el-pagination
    class="my-pager"
    background
    layout="prev, pager, next"
    :hide-on-single-page="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </el-pagination>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
}
</script>

<style lang="scss" scoped>
  .my-pager{
    text-align: center;
  }
</style>
