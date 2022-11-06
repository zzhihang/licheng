import request from '@/utils/request'

// 查询回标列表
export function listReply(query) {
  return request({
    url: '/bid/reply/list',
    method: 'get',
    params: query
  })
}

// 查询回标详细
export function getReply(replyId) {
  return request({
    url: '/bid/reply/' + replyId,
    method: 'get'
  })
}

// 新增回标
export function addReply(data) {
  return request({
    url: '/bid/reply',
    method: 'post',
    data: data
  })
}

// 修改回标
export function updateReply(data) {
  return request({
    url: '/bid/reply',
    method: 'put',
    data: data
  })
}

// 删除回标
export function delReply(replyId) {
  return request({
    url: '/bid/reply/' + replyId,
    method: 'delete'
  })
}
