<template>
  <component :is="'el-' + item.type" v-if="item.type!=='radio-group'" ref="self"
             v-model="formBox.form[item.key]" class="component"  v-bind:[dictKey]="dict" v-bind="attrs" v-on="events">
    <template v-for="slot in item.slots || []">
      <!-- slot.name 对应表单组件的slot-->
      <!-- 组件slot实例-->
      <template :slot="slot.name || 'default'">
        <!-- slot.name 对应组件slot-->
        <!-- 嵌套真正的slot实例-->
        <slot v-bind="item" :name="slot.slot" />
      </template>
    </template>
    <template v-if="['select'].includes(item.type) && !hasRender" @change="(v)=>{$emit('change', v)}">
      <!-- 当选择框并且没有渲染slot时，使用默认-->
      <el-option v-for="d in dict" :key="d.value" :label="d.name" :value="d.value" :disabled="d.disabled" />
    </template>
  </component>
  <el-radio-group v-else ref="self" v-model="formBox.form[item.key]" class="component" v-bind="attrs" v-on="events">
    <el-radio v-for="d in dict" :key="d.value" :label="d.value">
      {{ d.name }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'FormItem',
  inject: { formBox: { default: null } },
  props: {
    ext: {
      type: Object,
      default: () => ({})
    },
    dicts: {
      default: null,
      type: Array
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      changeAttrs: {}
    }
  },
  computed: {
    dictKey() {
      return this.attrs.dictKey || 'options'
    },
    code() {
      return this.attrs && this.attrs.code || 'value'
    },
    label() {
      return this.attrs && this.attrs.label || 'label'
    },
    dict() {
      return (this.dicts || this.item.options || this.item.dict || []).map(dict => {
        return { name: dict[this.label], value: dict[this.code], disabled: dict.disabled,...dict }
      })
    },
    hasRender() {
      return this.item.slots && this.item.slots.some(x => !x.name)
    },
    attrs() {
      const attrs = this.item.attrs || {}
      let maxlength = 200
      let showWordLimit = false
      if (attrs.type === 'textarea' && !attrs.maxlength && !attrs.disabled) {
        maxlength = 500
        showWordLimit = true
      }
      const clearable = !this.item.required
      return { showWordLimit, clearable, ...(this.formBox.defaultConfig[this.item.type] || {}), maxlength, ...(this.ext || {}).attrs, ...attrs, ...this.changeAttrs }
    },
    events() {
      const events = { ...this.item.listeners } || {}
      Object.keys(events).forEach((key) => {
        const event = events[key]
        if (typeof (event) === 'string') {
          events[key] = (() => (e) => this.$emit(event, e, this.formBox, this))()
        } else {
          events[key] = (() => (e) => event(e, this.formBox, this))()
        }
      })
      return events
    }
  },
  created() {
    if (!this.formBox) {
      this.formBox = this.$parent
      console.error('formItem不能单独使用，需配合form使用')
    }
    this.formBox.addChild && this.formBox.addChild(this.item.key, this)
  },
  beforeDestroy() {
    this.formBox.delChild && this.formBox.delChild(this.item.key)
  },
  methods: {
    setAttrs(attrs) {
      this.changeAttrs = attrs
    }
  }
}
</script>
<style lang="scss" scoped>

.form-item {
  display: flex;

  ::v-deep .el-form-item__content {
    flex: 1;
  }
}
</style>
