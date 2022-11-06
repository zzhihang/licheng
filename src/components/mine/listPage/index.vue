<template>
  <div class="list-page">
    <div class="page-container">
      <div v-if="title" class="list-page-title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  provide() {
    return { parent: this }
  },
  props: {
    backUrl: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    auto: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      query: null,
      table: null,
    }
  },
  watch: {
    auto: {
      handler() {
        if (this.auto) {
          this.getList()
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    getList() {
      if (this.table) {
        this.table.reset()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  padding: 15px;
  .list-page-title {
    height: 42px;
    border-bottom: 1px solid #edf0f6;
    background: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #303133;
    font-weight: 500;
  }
  .page-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
  .header {
    display: flex;
    align-items: center;
    height: 48px;
    background: #fff;
    line-height: 48px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    padding-left: 15px;
    .title {
      text-indent: 10px;
    }
    .back {
      width: 30px;
      height: 20px;
      border-right: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
    }
    .icon {
      width: 20px;
      height: 20px;
      fill: #606266;
    }
  }
}
</style>
