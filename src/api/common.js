import request from '@/utils/request'

// 首页招标列表
export function getData(params) {
  return request(params)
}

// 根据部门id获取本级与下级部门数据
export function getSubDept(params) {
  return request({
    url: '/security/common/get/current/and/sub/dept',
    method: 'get',
    params
  })
}

// 根据部门id获取下级部门数据
export function getChildDept(params) {
  return request({
    url: '/security/common/get/child/dept',
    method: 'get',
    params
  })
}

//获取部门下拉树列表（无数据权限控制
export function getDeptSelect(params) {
  return request({
    url: '/system/dept/deptselect',
    method: 'get',
    params
  })
}
//根据部门id查询本部门下用户
export function getUserByDeptId(params) {
  return request({
    url: '/system/user/getUserVoByDeptId',
    method: 'get',
    params
  })
}

//流程记录
// 提交审核通过/审核拒绝
export function postProcessLog(data) {
  return request({
    url: '/security/processLog/submitAudit',
    method: 'post',
    data
  })
}

// 查询具体业务审批日志
export function getProcessLog(id) {
  return request({
    url: `/security/processLog/list/${id}`,
    method: 'get'
  })
  // 上报
}

export function submit(data) {
  return request({
    url: `/security/processLog/submitReport`,
    method: 'post',
    data
  })
}

export function getOssInfo() {
  return request({
    url: '/system/config/getOssToken',
    method: 'get'
  })
}
export function getAppList() {
  return request({
    url: '/system/application/listAll',
    method: 'get'
  })
}
