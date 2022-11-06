import defaultSettings from '@/settings'
import Upload from '@/utils/oss'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const state = {
  ossClient: null,
  title: '',
  theme: storageSetting.theme || '#409EFF',
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
}
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_OSS_CLIENT: (state, client) => {
    state.ossClient = client
  }
}
const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  },
  getOssClient({ commit }, data) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      Upload.initClient().then(res => resolve(res))
      commit('SET_OSS_CLIENT', Upload)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

