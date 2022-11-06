import request from '@/utils/request'

//单位证书管理

// 查询列表
export function listUnitCerti(query) {
  return request({
    url: '/security/dept/certificate/manage/list',
    method: 'get',
    params: query
  })
}

// 查询详细信息
export function getUnitCertiDetail(query) {
  return request({
    url: `/security/dept/certificate/manage/${query.id}`,
    method: 'get',
    params: query
  })
}

// 新增
export function addUnitCerti(data) {
  return request({
    url: '/security/dept/certificate/manage',
    method: 'post',
    data: data
  })
}

// 修改
export function updateUnitCerti(data) {
  return request({
    url: '/security/dept/certificate/manage',
    method: 'put',
    data: data
  })
}

// 删除
export function delUnitCerti(ids) {
  return request({
    url: `/security/dept/certificate/manage/${ids}`,
    method: 'delete'
  })
}
