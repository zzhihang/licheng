import request from '@/utils/request'

// V1.7评级配置

// 评分分档列表
export function supplierGradingList(params) {
  return request({
    url: '/auth/supplierScoring/supplierGradingList',
    method: 'GET',
    params
  })
}

// 评分分档修改
export function supplierGradingEdit(data) {
  return request({
    url: '/auth/supplierScoring/supplierGrading',
    method: 'PUT',
    data
  })
}

// 供应商评分项列表
export function scoringItemList(params) {
  return request({
    url: '/auth/supplierScoring/scoringItemList',
    method: 'GET',
    params
  })
}

// 供应商评分项规则
export function scoringItemRuleList(params) {
  return request({
    url: '/auth/supplierScoring/scoringItemRuleList',
    method: 'GET',
    params
  })
}

// 供应商评分项规则修改
export function scoringItemRuleEdit(data) {
  return request({
    url: '/auth/supplierScoring/scoringItemRuleEdit',
    method: 'PUT',
    data
  })
}

// 重新生成公司评分
export function refreshDeptRule(params) {
  return request({
    url: '/auth/supplierScoring/refreshDeptRule',
    method: 'GET',
    params
  })
}

// 生成公司评分
export function supplierScoring(params) {
  return request({
    url: '/auth/supplierScoring/dept',
    method: 'GET',
    params
  })
}