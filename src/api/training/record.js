import request from '@/utils/request'

//安全记录

// 查询列表
export function listTrainRecord(query) {
  return request({
    url: '/security/train/record/list',
    method: 'get',
    params: query
  })
}

// 查询详细信息
export function getTrainRecordDetail(query) {
  return request({
    url: `/security/train/record/${query.id}`,
    method: 'get',
    params: query
  })
}

// 新增
export function addTrainRecord(data) {
  return request({
    url: '/security/train/record',
    method: 'post',
    data: data
  })
}

// 修改
export function updateTrainRecord(data) {
  return request({
    url: '/security/train/record',
    method: 'put',
    data: data
  })
}

// 删除
export function delTrainRecord(ids) {
  return request({
    url: `/security/train/record/${ids}`,
    method: 'delete'
  })
}

// 通过用户id查询培训档案
export function getUserTrainRecord(data) {
  return request({
    url: `/security/train/record/get/archives/by/userIds`,
    method: 'post',
    data: data
  })
}

//培训档案导出
export function exportArchives(data) {
  return request({
    url: `/security/train/record/export/archives`,
    method: 'post',
    data: data
  })
}