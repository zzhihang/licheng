<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" width="500px" title="添加用户">

  </el-dialog>
</template>

<script>
import { form } from './columns'

export default {
  name: 'add',
  inheritAttrs: false, // 组件属性是否以属性的方式挂载在dom节点上，如果需要挂载到节点，添加.prop修饰符
  props: {
    formData: {
      default: null,
      type: Object
    }
  },
  watch: {
    '$attrs.visible': {
      deep: true,
      handler(val) {
        if (!val) {
          this.$refs.form?.reset()
        }
      }
    }
  },
  data() {
    return {
      form,
      startLoading: false
    }
  },
  methods: {
    cancel() {
      this.hidden()
      this.$emit('cancel')
    },
    hidden() {
      this.$emit('update:visible', false)
    },
    finish() {
      this.hidden()
      this.$emit('finish')
    },
    submit(data) {
      if (data.id) {
        updateConfig(data).then(res => {
          if (res.code === 200) {
            this.msgSuccess('更新成功')
            this.finish()
          }
        })
      } else {
        addConfig(data).then(res => {
          if (res.code === 200) {
            this.msgSuccess('保存成功')
            this.finish()
          }
        })
      }
    }
  }
}
</script>
