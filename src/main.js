import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss' // common css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import '@/assets/styles/element-variables.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import filters from './filters'
import plugins from './plugins' // plugins
import { download } from '@/utils/request'
import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from '@/api/system/dict/data'
import { getConfigKey } from '@/api/system/config'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from '@/utils/ruoyi'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 字典标签组件
import DictTag from '@/components/DictTag'
import Editor from '@/components/Editor';

// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'
import Mine from '@/components/mine'
import upload from '@/utils/oss'
import { permission } from '@/mixins/permission'
import {callConfirm} from "@components/CallConfirm/CallConfirm";

Vue.mixin(permission)
// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.getFileUrl = function(path) {
  return upload.getFileUrl(path)
}
Vue.prototype.ossDownload = function(path, name) {
  upload.download(path, name)
}
Vue.prototype.ossPreview = function(path, name) {
  upload.preview(path)
}
Vue.prototype.msgSuccess = function(msg) {
  Element.Message.success(msg)
}
// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Editor', Editor)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)
Vue.use(directive)
Vue.use(filters)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(Mine)
DictData.install()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// Vue.prototype.ossUrl = process.env.VUE_APP_BASE_API
Vue.prototype.ossUrl = 'https://txcj-bid.oss-cn-qingdao.aliyuncs.com'
Vue.prototype.$callConfirm = callConfirm
Element.MenuItem.computed.paddingStyle = paddingStyle
Element.Submenu.computed.paddingStyle = paddingStyle
Element.Dialog.props.closeOnClickModal.default = false
Element.Dialog.props.appendToBody.default = true

function paddingStyle() {
  if (this.rootMenu.mode !== 'vertical') return {}
  let padding = 20
  let parent = this.$parent
  if (this.rootMenu.collapse) {
    padding = 20
  } else {
    while (parent && parent.$options.componentName !== 'ElMenu') {
      if (parent.$options.componentName === 'ElSubmenu') {
        padding += 10
      }
      parent = parent.$parent
    }
  }
  return { paddingLeft: padding + 'px' }
}
