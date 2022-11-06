export const filter = Object.freeze([{
  name: '系统名称',
  key: 'AppCode',
  type: 'select',
}, {
  name: '用户名',
  key: 'userName',
  type: 'input',
  attrs: {}
},
  {
    name: '客户端',
    key: 'clientType',
    type: 'select',
    attrs: {}
  }])
export const tableColumns = Object.freeze([
 {
  key: 'id',
  name: '序号'
}, {
  key: 'appCode',
  name: '系统名称'
}, {
  key: 'userName',
  name: '用户名称'
}, {
  key: 'clientType',
  name: '客户端'
}, {
  key: 'ip',
  name: '登录IP'
}, {
  key: 'time',
  name: '登录时间'
}])
