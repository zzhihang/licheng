import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getSubDept } from '@/api/common';

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    user: {},
    deptList: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_DEPT_LIST(state, deptList) {
      state.deptList = deptList
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          const token = res.data.access_token
          setToken(token, res.data?.expires_in)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.data || {}
          user.dept = user.sysDept
          const avatar = user.avatar
          const roles = res?.roles || []
          const permissions = user.userPermInfoVoList.map(x=>x.permissions).flat()
          commit('SET_USER', user)
          commit('SET_PERMISSIONS', permissions)
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          if (roles && roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', roles)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          // dispatch('getDeptList',user.deptId)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出系统
    LogOut({ commit, state }) {
      removeToken()
      commit('SET_TOKEN', '')
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    getDeptList({ commit }, deptId) {
      getSubDept({ deptId }).then(res => {
        if (res.code === 200) {
          renderDept(res.data)
          commit('SET_DEPT_LIST', res.data)
        }
      })
    }
  }
}

function renderDept(arr) {
  arr.forEach(item => {
    if (!item.children || !item.children.length) {
      delete item.children
    } else {
      renderDept(item.children)
    }
  })
}

export default user
