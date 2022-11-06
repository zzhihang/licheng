<template>
  <el-popover ref="pop" v-model="showDelTip" :reference="reference" placement="top" width="200">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <p>
        <i class="el-icon el-icon-question" style="color: #ff9900"></i>{{ tip }}
      </p>
    </template>
    <div style="text-align: right">
      <el-button size="mini" type="text" @click="showDelTip = false">{{cancelText}}</el-button>
      <el-button size="mini" type="primary" @click="del">{{confirmText}}</el-button>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'DelPopover',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    confirmText: {
      default: '确 认',
      type: String
    },
    cancelText: {
      default: '取 消',
      type: String
    },
    tip: {
      default: '你确定要删除吗？',
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    // 目标位置
    target: {
      type: Element,
      default: null
    }
  },
  data() {
    return {
      showDelTip: false,
      reference: false,
      timer: 0
    }
  },
  watch: {
    target() {
      this.update()
    },
    value(val) {
      this.$emit('change', false)
      if (!val) return
      this.showDel()
    }
  },
  created() {
    window.addEventListener('keydown', this.onKeydown)
    window.addEventListener('resize', this.update)
    window.addEventListener('scroll', this.update)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown)
    window.removeEventListener('resize', this.update)
    window.removeEventListener('scroll', this.update)
  },
  methods: {
    onKeydown(e) {
      if (this.showDelTip && /^Escape$/i.test(e.code)) {
        this.showDelTip = false
      }
    },
    update() {
      // 更新删除提示的位置
      if (this.timer) return
      this.showDelTip &&
      (this.timer = setTimeout(() => {
        const popperJS = this.$refs.pop.popperJS
        popperJS._reference = this.reference
        popperJS.state.updateBound()
        this.timer = null
      }, 16))
    },
    showDel() {
      this.showDelTip = true
      // 如果是同一个目标位置，直接返回，更新
      if (this.reference === this.target) return
      // 更新reference
      this.reference = this.target
      // 更新位置
      this.update()
    },
    del() {
      this.showDelTip = false
      this.$emit('confirm')
    }
  }
}
</script>
<style scoped>
.el-icon {
  margin-right: 8px;
}
</style>
