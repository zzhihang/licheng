export const filter = [
  {
    name: '所属系统',
    key: 'appCode',
    type: 'select'
  },
  {
    name: '角色名称',
    key: 'roleName',
    type: 'input'
  }, {
    name: '权限字符',
    key: 'roleKey',
    type: 'input'
  }, {
    name: '状态',
    key: 'status',
    type: 'select'
  }
]
export const tableColumns = [
  {
    type: 'selection',
    attrs: {
      width: 55
    }
  },
  {
    name: '角色编号',
    key: 'roleId',
    attrs: {
      width: 120
    }
  },
  {
    name: '角色名称',
    key: 'roleName',
    attrs: {
      minWidth: 200
    }
  },
  {
    name: '权限字符',
    key: 'roleKey',
    attrs: {
      width: 240
    }
  },
  {
    name: '所属系统',
    key: 'appCode',
    attrs: {
      width: 200
    }
  },
  {
    name: '显示顺序',
    key: 'roleSort',
    attrs: {
      width: 100
    }
  },
  {
    name: '状态',
    key: 'status',
    slots: ['status'],
    attrs: {
      width: 100
    }
  },
  {
    name: '创建时间',
    key: 'createTime',
    attrs: {
      align: 'center',
      width: 155
    }
  },
  {
    name: '操作',
    key: 'operate',
    slots: ['operate'],
    attrs: {
      width: 280
    }
  }
]
