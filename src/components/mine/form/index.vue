<template>
  <div class="form-box">
    <el-form ref="form" v-loading="loadingData" :model="form" :label-width="labelWidth" :inline="true" v-bind="$attrs" @submit.native.prevent>
      <slot />
      <template v-for="(item,index) in columns">
        <template v-if="item instanceof Array">
          <slot v-if="item[0]" :name="item[0].title" />
          <div :key="index" class="item-box" :class="item.class" :style="item.style">
            <template v-for="(child,j) in item">
              <div v-if="child.type==='blank'" class="blank"></div>
              <el-form-item v-else-if="isShow(child)" :key="`${index}-${j}`" :class="'form-item '+child.type" v-bind="computeAttrs(child)">
                <slot :name="child.before" />
                <form-item :item="child" :dicts="dictLib[child.key]" :ext="extColOptions[child.key]" v-on="getProxyEvent(child)">
                  <template v-for="slot in child.slots || []">
                    <!-- slot.name 对应表单组件的slot-->
                    <!-- 组件slot实例-->
                    <slot :slot="slot.name || 'default'" :name="slot.slot" />
                  </template>
                  <slot :name="child.after" />
                </form-item>
              </el-form-item>
            </template>
          </div>
        </template>
        <template v-else-if="item instanceof Object">
          <slot :name="item.title" />
          <el-form-item v-if="isShow(item)" :key="index" :class="'form-item '+item.type" v-bind="computeAttrs(item)">
            <slot :name="item.before" />
            <form-item :item="item" :dicts="dictLib[item.key]" :ext="extColOptions[item.key]" v-on="getProxyEvent(item)">
              <template v-for="slot in item.slots || []">
                <!-- slot.name 对应表单组件的slot-->
                <!-- 组件slot实例-->
                <slot :slot="slot.name || 'default'" :name="slot.slot" />
              </template>
            </form-item>
            <slot :name="item.after" />
          </el-form-item>
        </template>
      </template>
    </el-form>
    <slot name="footer" />
    <div v-if="!$attrs.disabled&&showButton" :class="['btn-box', buttonPosition, { isDialog }]">
      <el-button type="default" @click="$emit('cancel', form)">{{ cancelText }}</el-button>
      <el-button type="primary" :disabled="loading||disableSubmit" :loading="loading" @click="submit">{{ confirmText }}</el-button>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/common'
import formItem from '../formItem'
import { defaultConfig } from '../config'

export default {
  name: 'FormBox',
  components: { formItem },
  provide() {
    return { formBox: this }
  },
  props: {
    disableSubmit: {
      type: Boolean,
      default: false
    },
    isFormData: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    },
    submitting: {
      type: Boolean,
      default: false
    },
    dictLib: {
      type: Object,
      default: () => ({})
    },
    cancelText: {
      default: '取 消',
      type: String
    },
    confirmText: {
      default: '确 定',
      type: String
    },
    labelWidth: {
      type: [String, Number],
      default: '90px'
    },
    extColOptions: {
      type: Object,
      default: () => ({})
    },
    syncData: {
      type: Object,
      default: null
    },
    /**
     *@description  // 例子，默认值
     * @params show 布尔值或者函数，入参当前值和form组件
     * @params attrs 组件属性
     * @params listeners 组件监听
     * @params type 组件名
     */
    columns: {
      type: Array,
      default: () => [
        {
          type: 'input',
          key: 'key',
          name: '字段',
          required: true,
          rule: [],
          show: true,
          attrs: {},
          listeners: {}
        }
      ]
    },
    hasButton: {
      type: Boolean,
      default: true
    },
    isDialog: {
      type: Boolean,
      default: true
    },
    buttonPosition: {
      type: String,
      default: 'right'
    },
    beforeValidate: {
      type: Function,
      default: null
    },
    validated: {
      type: Function,
      default: null
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    url: {
      default: '',
      type: String
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    onSubmit: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      defaultConfig,
      loading: false,
      loadingData: true,
      form: {},
      groupColumns: [],
      children: {}
    }
  },
  watch: {
    submitting(val) {
      this.loading = val
    },
    loading(val) {
      this.$emit('update:submitting', val)
    },
    columns: {
      handler() {
        this.initForm()
      },
      immediate: true
    },
    formData: {
      handler(val = {}) {
        this.form = { ...this.form, ...val }
        this.updateSyncData()
        this.groupColumns.forEach((col) => {
          const key = col.key
          if (col.keys && col.keys.length&&this.form[key].length) {
            if (this.form[key] instanceof Array && this.form[key].some(x => x)) return
            this.form[key] = col.keys.map((k) => this.form[k] || '')
          }
        })
        this.$refs.form && this.$refs.form.resetFields()
      },
      immediate: true
    },
    url: {
      handler(val) {
        if (val) {
          this.getData()
        } else {
          this.loadingData = false
        }
      },
      immediate: true
    }
  },
  methods: {
    getForm() {
      return this.$refs.form
    },
    addChild(key, child) {
      this.children[key] = child
    },
    delChild(key) {
      delete this.children[key]
    },
    setAttrs(key, attrs) {
      const child = this.children[key]
      if (child) {
        child.setAttrs(attrs)
      }
    },
    updateSyncData() {
      if (this.syncData) {
        this.$emit('update:syncData', this.form)
      }
    },
    computeAttrs(item) {
      const attr = {
        label: item.name,
        rules: this.getRules(item),
        required: item.required,
        prop: item.key,
        key: item.key,
        style: item.style,
        class: item.class,
        ...item.computed && item.computed(this, item)
      }
      // 重新设置提示信息
      if (attr.required !== item.required) {
        if (attr.required) {
          this.renderRule(attr)
        } else {
          this.$refs.form && this.$refs.form.clearValidate([item.key])
        }
      }
      return attr
    },
    getProxyEvent(item) {
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
    isShow(item) {
      let flag = true
      if (item.show === undefined) {
        flag = true
      } else if (item.show instanceof Function) {
        flag = item.show(this.form[item.key], this)
      } else {
        flag = item.show
      }
      return flag
    },
    clearData(key) {
      this.form[key] = ''
    },
    getValue(key = '') {

      if (key) {
        return this.form[key]
      } else {
        const obj = { ...this.form }
        this.columns.forEach((item) => {
          if  (Array.isArray(item)) {
            item.forEach(el=>{
              if (Array.isArray(el.keys)) {
                el.keys.forEach((key, i) => {
                  const arr = this.form[el.key] || []
                  obj[key] = arr[i] || ''
                })
                delete obj[el.key]
              }
            })
          }else{
            if (Array.isArray(item.keys)) {
              item.keys.forEach((key, i) => {
                const arr = this.form[item.key] || []
                obj[key] = arr[i] || ''
              })
              delete obj[item.key]
            }
          }
        })
        return { ...obj }
      }
    },
    getRules(item) {
      return [...(this.rules[item.key] || []), ...(item.rules || [])]
    },
    reset() {
      setTimeout(() => {
        this.initForm()
        this.$refs.form.resetFields()
        this.$emit('reset', this.form)
      }, 300)
      this.loading = false
    },
    initForm() {
      const obj = {}
      this.groupColumns = []
      this.columns.forEach(item => {
        if (item instanceof Array) {
          item.forEach(child => {
            this.handlerItem(child, obj)
          })
        } else {
          this.handlerItem(item, obj)
        }
      })
      this.form = obj
      this.updateSyncData()
    },
    handlerItem(item, obj) {
      item.required && this.renderRule(item)
      this.setData(obj, item)
      this.collectGroupColumns(item)
    },
    collectGroupColumns(item) {
      if (item.keys && item.keys.length) {
        this.groupColumns.push(item)
      }
    },
    renderRule(item) {
      item.rules = item.rules || []
      if (
        !item.rules.some((rule) => {
          if (rule.required) return true
        })
      ) {
        item.rules.push({
          required: true,
          message:
            (defaultConfig[item.type] &&
              defaultConfig[item.type].placeholder) ||
            '请输入'
        })
      }
    },
    setData(obj, item) {
      if (![null, undefined].includes(item.default)) {
        obj[item.key] = item.default
      } else {
        if (item.type === 'select' && item.attrs && item.attrs.multiple||item.type==='date-picker'&&item.attrs?.type==='daterange') {

          obj[item.key] = []
        } else {
          obj[item.key] = ''
        }
      }
    },
    getData() {
      this.loadingData = true
      if (this.$listeners.search) {
        this.$emit('search')
      } else {
        getData({ url: this.url, data: {}, method: 'get' })
          .then((res) => {

            this.form = {
              ...this.form,
              ...((this.render && this.render(res)) || res.data)
            }
            this.updateSyncData()
          })
          .finally(() => {
            this.loadingData = false
          })
      }
    },
    dealData(data) {
      if (this.isFormData !== false) {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
          const item = data[key]
          if (Array.isArray(item)) {
            item.forEach((c) => {
              formData.append(key, c)
            })
          } else {
            formData.append(key, item)
          }
        })
        return formData
      }
      return data
    },
    submit() {
      this.loading = true
      this.$emit('update:submitting', true)
      if (this.beforeValidate && !this.beforeValidate(this.form)) {
        return this.reject()
      }
      let flag = true
      let data = {}
      this.$refs.form.validate((res) => {
        if (!res) {
          this.stop()
          flag = false
          return
        }
        if (this.validated && !this.validated(this.form)) {
          flag = false
          return
        }
        data = this.dealData(this.getValue())
        // 如果onSubmit存在，优先执行
        if (this.onSubmit) {
          // 如果是同步
          if (
            Object.prototype.toString
              .call(this.onSubmit)
              .indexOf('AsyncFunction') > 0
          ) {
            this.onSubmit(data).finally(() => {
              this.stop()
              this.form={}
            })
          } else {
            // 如果不是同步函数
            const res = this.onSubmit(data)
            // 如果返回的是promise实例
            if (res instanceof Promise) {
              res.finally(() => {
                this.stop()
                this.form={}
              })
            }
          }
        }
        this.$emit('submit', data)
      })
      return (flag && this.resolve(data)) || this.reject()
    },
    stop() {
      this.loading = false
      this.$emit('update:submitting', false)
    },
    resolve(data) {
      return new Promise(resolve => {
        resolve(data)
      })
    },
    reject() {
      return new Promise((resolve) => {
        resolve(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  background: #fff;

  ::v-deep {
    .el-form {
      border-bottom: 1px solid transparent;
    }

    .el-form-item {
      width: 100%;
      display: flex;

      .el-form-item__content {
        flex: 1;
      }

      .component {
        width: 100%;
      }
    }
  }

  .btn-box {
    display: flex;
    position: relative;
    flex: 1;
    align-items: flex-start;
    justify-content: center;

    &.right {
      justify-content: flex-end;
    }

    &.left {
      justify-content: flex-start;
    }

    &.isDialog {
      //position: relative;
      //top: 8px;
    }
  }

  .item-box {
    display: flex;
    overflow: hidden;
    flex-wrap: nowrap;

    ::v-deep .el-form-item {
      flex: 1;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.blank{
  flex: 1;
}
</style>
