import request from '@/utils/request'

// 查询答疑列表
export function listQa(query) {
  return request({
    url: '/bid/qa/list',
    method: 'get',
    params: query
  })
}

// 查询答疑详细
export function getQa(qaId) {
  return request({
    url: '/bid/qa/' + qaId,
    method: 'get'
  })
}

// 新增答疑
export function addQa(data) {
  return request({
    url: '/bid/qa',
    method: 'post',
    data: data
  })
}

// 修改答疑
export function updateQa(data) {
  return request({
    url: '/bid/qa',
    method: 'put',
    data: data
  })
}

// 删除答疑
export function delQa(qaId) {
  return request({
    url: '/bid/qa/' + qaId,
    method: 'delete'
  })
}
