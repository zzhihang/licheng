import request from '@/utils/request'

//证件类别

// 查询列表
export function listCertiType(query) {
  return request({
    url: '/security/certificate/manage/list',
    method: 'get',
    params: query
  })
}

// 查询详细信息
export function getCertiTypeDetail(query) {
  return request({
    url: `/security/certificate/manage/${query.id}`,
    method: 'get',
    params: query
  })
}

// 新增
export function addCertiType(data) {
  return request({
    url: '/security/certificate/manage',
    method: 'post',
    data: data
  })
}

// 修改
export function updateCertiType(data) {
  return request({
    url: '/security/certificate/manage',
    method: 'put',
    data: data
  })
}

// 删除
export function delCertiType(ids) {
  return request({
    url: `/security/certificate/manage/${ids}`,
    method: 'delete'
  })
}

//导出
export function exportCertiType() {
  return request({
    url: '/security/certificate/manage/export',
    method: 'post',
    responseType: 'blob'
  })
}

//根据证书类型获取证书列表
export function getCertiType(id) {
  return request({
    url: `/security/certificate/manage/type/${id}`,
    method: 'get'
  })
}