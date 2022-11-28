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

export function getEnterpriseOperate(companyId) {
  return request({
    url: `/company/infoByCompany/${companyId}`,
    method: 'get',
  })
}
