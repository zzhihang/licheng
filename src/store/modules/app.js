const state = {
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: 'medium',
  isCaps: false,
  appList: [],
  loginVisible: false
}
window.addEventListener('keydown', (e) => {
  state.isCaps = e && e.getModifierState('CapsLock')
})
window.addEventListener('mousedown', (e) => {
  state.isCaps = e && e.getModifierState('CapsLock')
})
const mutations = {
  SET_APP_LIST(state, data) {
    state.appList = data
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.getItem('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_LOGIN_VISIBLE: (state, visible) => {
    state.loginVisible = visible
  },
  SET_SIZE: (state, size) => {
    state.size = size
    localStorage.setItem('size', size)
  }
}
const actions = {
  setAppList({ commit }, data) {
    commit('SET_APP_LIST', data)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleLoginVisible({ commit }, { visible }) {
    commit('TOGGLE_LOGIN_VISIBLE', visible)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
