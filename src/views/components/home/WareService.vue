<template>
  <div class="card-list-box">
    <ware-service-storage style="margin-right: 29px;"></ware-service-storage>
    <ware-service-logistics></ware-service-logistics>
  </div>
</template>

<script>
import Vue from 'vue';
import WareServiceStorage from "@views/components/home/WareServiceStorage";
import WareServiceLogistics from "@views/components/home/WareServiceLogistics";

export default {
  components: {
    WareServiceStorage,
    WareServiceLogistics
  },
}
</script>

<style lang="scss" scoped>
.card-list-box {
  display: flex;
  .card-list{
    flex: 1;
  }
}
</style>
