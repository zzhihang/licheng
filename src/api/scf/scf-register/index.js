import request from '@/utils/request'
// V1.6供应链入驻及审核

// 获取基本信息、研发与产品、售后与经营业绩
export function subInfo(params) {
  return request({
    url: '/auth/enterApproval/subInfo',
    method: 'GET',
    params
  })
}

// 入驻审批列表
export function approvalList(params) {
  return request({
    url: '/auth/enterApproval/approvalList',
    method: 'GET',
    params
  })
}

// 入驻审核接口
export function enterApproval(data) {
  return request({
    url: '/auth/enterApproval/audi',
    method: 'PUT',
    data
  })
}