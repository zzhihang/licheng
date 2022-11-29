import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/user/currentUser',
    method: 'get',
  })
}

export function saveEnterprise(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}

export function getEnterprise(id) {
  return request({
    url: `/company/info/${id}`,
    method: 'get',
  })
}

//当前的企业认证信息
export function getCurrentEnterpriseInfo() {
  return request({
    url: `/company/current`,
    method: 'get',
  })
}

//当前的企业营运信息
export function getCurrentEnterpriseOperateInfo() {
  return request({
    url: `/operate/current`,
    method: 'get',
  })
}

export function getEnterpriseOperate(companyId) {
  return request({
    url: `/operate/infoByCompany/${companyId}`,
    method: 'get',
  })
}

//审核 0 认证资料 1 运营资料 1 认证通过 2 驳回认证
export function auditEnterprise({id, type, status}) {
  return request({
    url: `/company/audit`,
    method: 'post',
    data: {id, type, status}
  })
}
