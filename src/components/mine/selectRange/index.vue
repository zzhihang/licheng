<template>
  <el-select v-model="start" :multiple-limit="2" multiple>
    <el-option v-for="item in $attrs.options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
export default {
  name: 'ElSelectRange',
  props: {
    value: {
      default: [],
      type: Array
    }
  },
  model: {
    compute: 'value',
    event: 'change'
  },
  data() {
    return {
      start: '',
      end: ''
    }
  },
  created() {
    console.log(this.$attrs)
  },
  methods: {}
}
</script>

<style scoped>

</style>
