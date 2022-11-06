import request from '@/utils/request'

// 查询操作日志列表
export function listLog(query) {
  return request({
    url: '/bid/log/list',
    method: 'get',
    params: query
  })
}

// 查询操作日志详细
export function getLog(logId) {
  return request({
    url: '/bid/log/' + logId,
    method: 'get'
  })
}

// 新增操作日志
export function addLog(data) {
  return request({
    url: '/bid/log',
    method: 'post',
    data: data
  })
}

// 修改操作日志
export function updateLog(data) {
  return request({
    url: '/bid/log',
    method: 'put',
    data: data
  })
}

// 删除操作日志
export function delLog(logId) {
  return request({
    url: '/bid/log/' + logId,
    method: 'delete'
  })
}
