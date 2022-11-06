import request from '@/utils/request'

// 查询预报名资料列表
export function listPaper(query) {
  return request({
    url: '/bid/paper/list',
    method: 'get',
    params: query
  })
}

// 查询预报名资料详细
export function getPaper(paperId) {
  return request({
    url: '/bid/paper/' + paperId,
    method: 'get'
  })
}

// 新增预报名资料
export function addPaper(data) {
  return request({
    url: '/bid/paper',
    method: 'post',
    data: data
  })
}

// 修改预报名资料
export function updatePaper(data) {
  return request({
    url: '/bid/paper',
    method: 'put',
    data: data
  })
}

// 删除预报名资料
export function delPaper(paperId) {
  return request({
    url: '/bid/paper/' + paperId,
    method: 'delete'
  })
}
