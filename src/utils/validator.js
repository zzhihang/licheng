export const MOBILE_VALIDATOR = { pattern: /^1[3456789]\d{9}$/, message: "请输入合法手机号", trigger: "blur" }

export const NUMBER_VALIDATOR = { pattern: /^[0-9]+.{0,1}[0-9]{0,2}$/, message: '请输入有效数字', trigger: 'blur'}

//数字或字母
export const NUMBER_CODE_VALIDATOR = { pattern: /^[0-9a-zA-Z]*$/g, message: '请输入数字或字母', trigger: 'blur'}

//身份证
export const ID_CARD_VALIDATOR = { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效身份证', trigger: 'blur'}
