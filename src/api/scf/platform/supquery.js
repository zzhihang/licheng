import request from '@/utils/request'

// 新增产品
export function evaluateGrade(data) {
  return request({
    url: '/bid/bid',
    method: 'post',
    data
  })
}
