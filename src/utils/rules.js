export const email = [
  {
    pattern: /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '邮箱格式不正确'
  }
]
export const phone = [
  {
    pattern: /(^1[3-9]\d{9}$)|(^(\(0\d{2,3}\))|(0\d{2,3}-?)\d{7,8}$)/,
    message: '电话格式不正确'
  }
]
export const mobile = [
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确'
  }
]
