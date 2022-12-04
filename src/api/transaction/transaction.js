import request from '@/utils/request'

export function getTransactionBiddingList(params) {
  return request({
    url: '/index/transaction/bidding',
    method: 'get',
    params: params
  })
}

export function getTransactionListingList({ pageNum = 1, pageSize = 10}) {
  return request({
    url: '//index/transaction/listing',
    method: 'get',
    params: {pageNum, pageSize}
  })
}


