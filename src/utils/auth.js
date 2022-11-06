import cookie from '@/utils/cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return cookie.getCookie(TokenKey)
  // return localStorage.getItem(TokenKey)
}

export function setToken(token, time) {
  // localStorage.setItem(TokenKey, token)
  cookie.setCookie(TokenKey, token, time, true)
}

export function removeToken() {
  cookie.delCookie(TokenKey, true)
  // return localStorage.removeItem(TokenKey)
}
