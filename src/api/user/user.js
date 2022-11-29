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
export function getCurrentEnterpriseInfo(id) {
  return request({
    url: `/company/current`,
    method: 'get',
  })
}

//当前的企业营运信息
export function getCurrentEnterpriseOperateInfo(id) {
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
