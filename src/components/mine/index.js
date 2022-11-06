import ListPage from './listPage'
import MyTable from './myTable'
import QueryBox from './queryBox'
import FormBox from './form'
import FormItem from './formItem'
import DelPopover from './delPopover'
import ElFileUpload from './fileUpload'
import ElSelectRange from './selectRange'
import FilePreview from './filePreview'

class MineUI {
  constructor() {
    this.fns = []
    this.components = {
      ListPage,
      MyTable,
      QueryBox,
      FormBox,
      FormItem,
      DelPopover,
      ElFileUpload, ElSelectRange,FilePreview
    }
  }

  install(Vue) {
    //    Vue.prototype.ossUrl = OSS_URL.image
    this.fns.forEach((fn) => {
      Vue.prototype[fn] = this[fn]
    })
    for (const name in this.components) {
      Vue.component(name, this.components[name])
    }
  }
}

export default new MineUI()
