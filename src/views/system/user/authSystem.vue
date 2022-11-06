<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" width="500px">
    <form-box buttonPosition="right" @sysChange="onSysChange" :form-data="formData" ref="form" :submitting="startLoading" label-width="85px" :columns="form" @cancel="cancel" :on-submit="submit" />
  </el-dialog>
</template>

<script>

export default {
  name: 'AuthSystem',
  inheritAttrs: true, // 组件属性是否以属性的方式挂载在dom节点上，如果需要挂载到节点，添加.prop修饰符
  props: {
    formData: {
      default: null,
      type: Object
    }
  },
  computed: {
    form() {
      return [{
        name: '用户名',
        key: 'userName',
        type: 'input',
        attrs: {
          disabled: true
        },
        required: true
      }, {
        name: '业务系统',
        key: 'systemId',
        type: 'select',
        attrs: {
          multiple: true
        },
        required: true,
        listeners: {
          change: 'sysChange'
        }
      }, {
        name: '系统角色',
        key: 'roles',
        type: 'cascader',
        attrs: {
          props: {
            multiple: true
          }
        }
      }]
    }
  },
  watch: {
    '$attrs.visible': {
      deep: true,
      handler(val) {
        if (!val) {
          this.$refs.form.reset()
        }
      }
    }
  },
  data() {
    return {
      startLoading: false
    }
  },
  methods: {
    onSysChange(val){
      // 接口获取系统角色
    },
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
      let res
      if (data.id) {
        res = updateConfig(data)
      } else {
        res = addConfig(data)
      }
      return res.then(res => {
        this.msgSuccess('保存成功')
        this.finish()
      })
    }
  }
}
</script>
