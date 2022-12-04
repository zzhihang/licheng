import request from '@/utils/request'
import axios from "axios";

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://39.104.116.61:9080',
  // 超时
  timeout: 30000
})

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/auth/login',
    // url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    // url: 'sso/getInfo',
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/code',
    // url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取验证码
export function getCodeSms(mobile) {
  return request({
    url: '/auth/senRegisterCode',
    headers: {
      isToken: false
    },
    method: 'post',
    timeout: 20000,
    data: {mobile}
  })
}
