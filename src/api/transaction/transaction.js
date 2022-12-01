import request from '@/utils/request'

export function getTransactionBiddingList(params) {
  return request({
    url: '/bidding/centerList',
    method: 'get',
    params: params
  })
}

export function getTransactionListingList({ pageNum = 1, pageSize = 10}) {
  return request({
    url: '/listing/centerList',
    method: 'get',
    params: {pageNum, pageSize}
  })
}


