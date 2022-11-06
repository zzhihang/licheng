import request from '@/utils/request'

// 审核注册认证信息
export function auditCert(data) {
  return request({
    url: '/auth/certification/audit',
    method: 'put',
    data,
  })
}

// 查询实名认证信息列表
export function listCertification(query) {
  return request({
    url: '/auth/certification/list',
    method: 'get',
    params: query
  })
}

// 查询实名认证信息详细
export function getCertification(certId) {
  return request({
    url: '/auth/certification/' + certId,
    method: 'get'
  })
}

// 新增实名认证信息
export function addCertification(data) {
  return request({
    url: '/auth/certification',
    method: 'post',
    data: data
  })
}

// 修改实名认证信息
export function updateCertification(data) {
  return request({
    url: '/auth/certification',
    method: 'put',
    data: data
  })
}

// 删除实名认证信息
export function delCertification(certId) {
  return request({
    url: '/auth/certification/' + certId,
    method: 'delete'
  })
}

// 审核授权人认证信息
export function auditCertAuthorizer(data) {
  return request({
    url: '/auth/certification/audit_authorizer',
    method: 'put',
    data,
  })
}

// 审核企业认证信息
export function auditCertDept(data) {
  return request({
    url: '/auth/certification/audit_dept',
    method: 'put',
    data,
  })
}

// 供应链

// 供应链采购商入驻列表
export function listCerScf(query) {
  return request({
    url: '/auth/certification/listChainApply',
    method: 'get',
    params: query
  })
}

// 入驻信息
export function listChainApply(query) {
  return request({
    url: '/auth/certification/listChainApply',
    method: 'get',
    params: query
  })
}

// 审核供应链认证信息
export function auditCerScf(data) {
  return request({
    url: '/auth/certification/auditChainApply',
    method: 'put',
    data,
  })
}
