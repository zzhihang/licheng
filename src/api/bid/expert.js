import request from '@/utils/request'

// 查询专家列表
export function listAllReview(params) {
  return request({
    url: '/bid/expert/listAllReview',
    method: 'get',
    params
  })
}

// 查询专家详细信息
export function getExpertId(expertId) {
  return request({
    url: '/bid/expert/' + expertId,
    method: 'get'
  })
}

// 新增专家信息
export function addExpert(data) {
  return request({
    url: '/bid/expert',
    method: 'post',
    data
  })
}
// 修改专家信息
export function editExpert(data) {
  return request({
    url: '/bid/expert',
    method: 'put',
    data
  })
}
// 查询专家项目列表
export function getProList(params) {
  return request({
    url: '/bid/bid/selectProjectReviewList',
    method: 'get',
    params
  })
}
// 查询公司部门列表
export function getDeptList(params) {
  return request({
    url: 'bid/expert/queryExpertsDeptList',
    method: 'get',
    params
  })
}
// 修改停用状态
export function disableExperts(data) {
  return request({
    url: '/bid/expert/disableExperts',
    method: 'put',
    data
  })
}

