<template>
  <span>{{count.day}}天{{count.hour}}小时{{count.minute}}分{{count.second}}秒</span>
</template>

<script>
import Vue from 'vue';
import {ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND} from "@utils/time-const";

export default {
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: {},
      distance: 0,
      isFinish: false
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.distance = this.distance - 1000;
    }, 1000)
  },
  methods: {
    calc() {
      const distance = this.distance;
      if(distance < 0){
        this.isFinish = true;
        window.clearInterval(this.timer);
        this.$emit('finish')
      }
      const day = Math.floor(distance / ONE_DAY);
      let hour = Math.floor((distance - day * ONE_DAY) / ONE_HOUR);
      let minute = Math.floor((distance - day * ONE_DAY - hour * ONE_HOUR) / ONE_MINUTE);
      let second = Math.floor((distance - day * ONE_DAY - hour * ONE_HOUR - minute * ONE_MINUTE) / ONE_SECOND);
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      this.count = {
        day, hour, minute, second
      }
    }
  },
  watch: {
    time: {
      handler(val) {
        this.distance = this.time;
      },
      immediate: true
    },
    distance: {
      handler(val) {
        this.calc()
      },
      immediate: true
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
