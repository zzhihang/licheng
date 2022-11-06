import { imageLink } from '@/utils/index'

function createFilterRegister(Vue) {
  return (name, fn) => {
    Vue.filter(name, fn)
  }
}
const allFilters = {
  imageLink
}
const install = function(Vue) {
  const filterRegister = createFilterRegister(Vue)
  Object.keys(allFilters).forEach((name) => {
    filterRegister(name, allFilters[name])
  })
}

export default install
