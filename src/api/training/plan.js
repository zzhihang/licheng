import request from '@/utils/request'

//安全计划

// 查询列表
export function listTrainPlan(query) {
  return request({
    url: '/security/train/plan/list',
    method: 'get',
    params: query
  })
}

// 查询详细信息
export function getTrainPlanDetail(query) {
  return request({
    url: `/security/train/plan/${query.id}`,
    method: 'get',
    params: query
  })
}

// 新增
export function addTrainPlan(data) {
  return request({
    url: '/security/train/plan',
    method: 'post',
    data: data
  })
}

// 修改
export function updateTrainPlan(data) {
  return request({
    url: '/security/train/plan',
    method: 'put',
    data: data
  })
}

// 删除
export function delTrainPlan(ids) {
  return request({
    url: `/security/train/plan/${ids}`,
    method: 'delete'
  })
}

//导出
export function exportTrainPlan() {
  return request({
    url: '/security/train/plan/export',
    method: 'post',
    responseType: 'blob'
  })
}