<template>
  <el-form ref="form" class="query-box" :model="form" :label-width="labelWidth" :inline="true" @submit.native.prevent>
    <div v-if="isSingle && noSlot === false" class="slot-box">
      <slot/>
    </div>
    <div v-if="columns.length" ref="columns" class="columns" :class="{ isCollapse, isSingle: isSingle && noSlot === false }">
      <template v-for="(item,index) in columns">
        <div v-if="item.type==='br'" class="grow-box"/>
        <template v-else-if="item instanceof Array">
          <div :key="index" class="item-box" :class="item.class" :style="item.style">
            <template v-for="(child,j) in item">
              <div v-if="child.type==='split'" class="split">{{child.name}}</div>
              <el-form-item v-else :key="child.key" :label="isSingle ? '' : child.name" :style="getWidth(child.width)">
                <form-item :item="child" :dicts="dictLib[child.key]" v-on="getProxyEvent(child)"/>
              </el-form-item>
            </template>
          </div>
        </template>
        <template v-else-if="item instanceof Object">
          <el-form-item :key="item.key" :label="isSingle ? '' : item.name" :style="getWidth(item.width)">
            <form-item :item="item" :dicts="dictLib[item.key]" v-on="getProxyEvent(item)"/>
          </el-form-item>
        </template>
      </template>
    </div>
    <div v-if="columns.length" class="btn-box">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="search">{{ searchText }}</el-button>
      <el-button v-if="!isSingle" icon="el-icon-refresh" size="mini" type="default" @click="reset">重&nbsp;&nbsp;置</el-button>
      <!--      <el-button-->
      <!--        v-if="hasCollapse"-->
      <!--        type="text"-->
      <!--        class="collapse"-->
      <!--        @click="isCollapse = !isCollapse"-->
      <!--      >-->
      <!--        <i-->
      <!--          class="el-icon-arrow-up"-->
      <!--          style="color: #1890ff; font-size: 18px"-->
      <!--          :class="{ isCollapse }"-->
      <!--        ></i>-->
      <!--      </el-button>-->
    </div>
    <div v-if="!isSingle && $slots.default" style="flex: 0 0 100%;" class="slot-box">
      <slot/>
    </div>
  </el-form>
</template>

<script>
import FormItem from '../formItem'
import { defaultConfig } from '../config'

export default {
  name: 'QueryBox',
  components: { FormItem },
  provide () {
    return { formBox: this }
  },
  inject: { parent: { default: null } },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    beforeGetData: {
      type: Function,
      default: null
    },
    isIndependent: {
      type: Boolean,
      default: false
    },
    noSlot: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
      default: '查 询'
    },
    defaultFilter: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    dictLib: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isCollapse: false,
      defaultConfig,
      form: {},
      hasCollapse: false
    }
  },
  computed: {
    isSingle () {
      return this.columns.length === 1
    }
  },
  watch: {
    columns: {
      handler () {
        this.initForm()
        if (this.columns.length) {
          this.$nextTick(() => {
            this.hasCollapse = this.$refs.columns.offsetHeight > 48
          })
        }
      },
      immediate: true
    }
  },
  created () {
    if (this.parent && this.isIndependent === false) {
      this.parent.query = this
    }
  },
  methods: {
    getProxyEvent (item) {
      const events = {}
      const obj = item.listeners
      if (!obj) return events
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          const event = obj[key]
          events[event] = (...arr) => this.$emit(event, ...arr)
        }
      }
      return events
    },
    getWidth (w) {
      if (!isNaN(w)) {
        return `width:${w}%`
      }
      return ''
    },
    getData () {
      const obj = {}
      this.columns.forEach((item) => {
        if (item.type === 'br') return
        if (item.keys) {
          item.keys.forEach((key, i) => {
            const arr = this.form[item.key] || []
            obj[key] = arr[i] || ''
          })
        } else {
          obj[item.key] = this.form[item.key]
        }
      })
      let data = { ...this.defaultFilter, ...obj }
      data = this.beforeGetData && this.beforeGetData(data) || data
      return data
    },
    search () {
      if (this.parent && this.isIndependent === false) {
        this.parent.getList()
      }
      this.$emit('search', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
      this.initForm()
      this.search()
      this.$emit('reset', this.form)
    },
    initForm () {
      const obj = {}
      this.columns.forEach((item) => {
        if (item.type === 'br') return
        if (item instanceof Array) {
          item.forEach((child) => {
            this.setData(obj, child)
          })
        } else {
          this.setData(obj, item)
        }
      })
      this.form = obj
    },
    setData (obj, item) {
      if (![null, undefined].includes(item.default)) {
        obj[item.key] = item.default
      } else if (item.type === 'select' && item.attrs && item.attrs.multiple) {
        obj[item.key] = []
      } else {
        obj[item.key] = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .grow-box {
    flex: 1 1 100%;
    height: 1px;
  }

  .query-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding: 15px 0;
    .slot-box {
      flex: 1;
    }
    .btn-box {
      display: flex;
      flex: 0 0 auto;
      align-items: flex-start;
    }
    .columns {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      &.isCollapse {
        height: 48px;
        overflow: hidden;
      }
      &.isSingle {
        flex: 0 0 auto;
        .el-form-item {
          width: auto !important;
        }
      }
    }
    .item-box{
      width: 320px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .split{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
        margin-bottom: 16px;
      }
    }
    ::v-deep {
      .el-form-item {
        width: 320px;
        display: flex;
        padding-right: 10px;
        margin-right: 0;
        margin-bottom: 16px;
      }
      .el-form-item__label {
        flex: 0 0 auto;
      }
      .el-form-item__content {
        flex: 1;
        > * {
          width: 100%;
        }
        > .el-range-editor{min-width: 225px;}
      }
      //@media (max-width: 1919px) {
      //  .el-form-item {
      //    width: calc(33.333%);
      //  }
      //}
      //@media (min-width: 1920px) {
      //  .el-form-item {
      //    width: calc(25%);
      //  }
      //}
    }
    .collapse {
      flex: 0;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 7px;
      .el-icon-arrow-up {
        transition: all 0.3s;
      }
      .isCollapse {
        transform: rotate(180deg);
      }
    }
  }
</style>
