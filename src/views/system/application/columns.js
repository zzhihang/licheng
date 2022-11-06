export const filter = Object.freeze([{
  name: '系统名称',
  key: 'app_name',
  type: 'input',
  attrs: {
  }
}, {
  name: '系统编号',
  key: 'app_code',
  type: 'input',
  attrs: {}
}])
export const form = Object.freeze([{
  name: '系统名称',
  key: 'app_name',
  type: 'select',
  required: true,
  attrs: { maxLength: 256 }
}, {
  name: '系统编号',
  key: 'app_code',
  type: 'input',
  required: true,
  attrs: { maxLength: 20 }
}, {
  name: '系统描述',
  key: 'app_quality',
  type: 'input',
  attrs:{
    type:'textarea'
  },
  required: true
}])
export const tableColumns = Object.freeze([{
  attrs: {
    type: 'selection',
    width: 40
  }
}, {
  key: 'id',
  name: '序号',
  attrs: {
    type: 'index',
    width: 80
  }
}, {
  key: 'app_name',
  name: '系统名称'
}, {
  key: 'app_code',
  name: '系统编号'
}, {
  key: 'app_quality',
  name: '描述',
  dict: [
    {value: 0, label: '内部使用系统'}, 
    {value: 1, label: '外部使用系统'},
    {value: 2, label: '内外部都使用'},
    {value: 3, label: '第三方系统'}
  ]
}, {
  key: 'operate',
  name: '操作',
  slots: ['operate'],
  attrs: {
    width: 230
  }
}])
