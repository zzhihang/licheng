import request from '@/utils/request'

// 查询报名列表
export function listApply(query, isMine) {
  if (isMine) {
    return request({
      url: `/bid/apply/mine/${query.bidId}`
    }).then((res) => {
      if (!res.data) {
        res.rows = []
      } else {
        res.rows = [res.data]
      }
      return res
    })
  }
  return request({
    url: '/bid/apply/list',
    method: 'get',
    params: query
  })
}

export function applyAudit(data) {
  return request({
    url: '/bid/apply/audit',
    method: 'put',
    data
  })
}

// 查询报名详细
export function getApply(applyId) {
  return request({
    url: '/bid/apply/' + applyId,
    method: 'get'
  })
}

// 新增报名
export function addApply(data) {
  return request({
    url: '/bid/apply',
    method: 'post',
    data: data
  })
}

// 修改报名
export function updateApply(data) {
  return request({
    url: '/bid/apply',
    method: 'put',
    data: data
  })
}

// 删除报名
export function delApply(applyId) {
  return request({
    url: '/bid/apply/' + applyId,
    method: 'delete'
  })
}
