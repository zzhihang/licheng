import request from '@/utils/request'

// 查询招标列表
export function listBid(query) {
  return request({
    url: '/bid/bid/list',
    method: 'get',
    params: query
  })
}

// 查询招标详细
export function getBid(bidId) {
  return request({
    url: '/bid/bid/' + bidId,
    method: 'get'
  })
}

export function getBidLog(query) {
  return request({
    url: '/bid/log/list',
    method: 'get',
    params: query
  })
}

export function getBidQuestions(query) {
  return request({
    url: '/bid/qa/list',
    method: 'get',
    params: query
  })
}

// 新增疑问
export function addQA(data) {
  return request({
    url: '/bid/qa',
    method: 'post',
    data: data
  })
}

// 回复疑问
export function replyQA(data) {
  return request({
    url: '/bid/qa',
    method: 'put',
    data: data
  })
}

// 添加回添
export function addBidReply(data) {
  return request({
    url: '/bid/reply',
    method: 'post',
    data: data
  })
}

export function addReplyScore(data) {
  return request({
    url: '/bid/reply/review',
    method: 'put',
    data: data
  })
}

export function setReplyWin(data) {
  return request({
    url: '/bid/reply/win',
    method: 'put',
    data: data
  })
}

export function getBidReply(bidId) {
  return request({
    url: `/bid/reply/mine/${bidId}`,
    method: 'get'
  })
}

export function getBidReplyList(params) {
  return request({
    url: `/bid/reply/list`,
    method: 'get',
    params
  })
}

// 申请解封
export function openBid(bidId) {
  return request({
    url: `/bid/bid/open/${bidId}`,
    method: 'put'
  })
}

// 新增招标
export function addBid(data) {
  return request({
    url: '/bid/bid',
    method: 'post',
    data: data
  })
}

// 修改招标
export function updateBid(data) {
  return request({
    url: '/bid/bid',
    method: 'put',
    data: data
  })
}

// 删除招标
export function delBid(bidId) {
  return request({
    url: '/bid/bid/' + bidId,
    method: 'delete'
  })
}
