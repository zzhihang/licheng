import request from '@/utils/request'

// 查询登录日志列表
export function list(params) {
  return request({
    url: '/system/logininfor/list',
    method: 'get',
    params
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/monitor/logininfor/' + infoId,
    method: 'delete'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'delete'
  })
}
