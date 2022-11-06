import request from '@/utils/request'

//人员证书管理

// 查询列表
export function listMemberCerti(query) {
  return request({
    url: '/security/personnel/certificate/manage/list',
    method: 'get',
    params: query
  })
}

// 查询详细信息
export function getMemberCertiDetail(query) {
  return request({
    url: `/security/personnel/certificate/manage/${query.id}`,
    method: 'get',
    params: query
  })
}

// 新增
export function addMemberCerti(data) {
  return request({
    url: '/security/personnel/certificate/manage',
    method: 'post',
    data: data
  })
}

// 修改
export function updateMemberCerti(data) {
  return request({
    url: '/security/personnel/certificate/manage',
    method: 'put',
    data: data
  })
}

// 删除
export function delMemberCerti(ids) {
  return request({
    url: `/security/personnel/certificate/manage/${ids}`,
    method: 'delete'
  })
}
