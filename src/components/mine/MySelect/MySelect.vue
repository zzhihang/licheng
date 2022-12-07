<template>
  <el-select placeholder="请选择" @change="onChange" v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      v-bind="$attrs"
    >
    </el-option>
  </el-select>
</template>

<script>
import request from "@utils/request";

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      options: []
    }
  },
  created(){
    if(this.url){
      request({
        url: this.url,
        method: 'get',
        params: {
          name: ''
        }
      }).then(({rows}) => {
        this.options = rows.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      })
    }
  },
  methods: {
    onChange(e) {
      this.$emit('input', e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
