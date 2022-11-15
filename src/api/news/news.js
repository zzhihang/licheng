import request from '@/utils/request'

export function newCenterList({newsType = 1, pageNum = 1, pageSize = 10}) {
  return request({
    url: '/bulktrade/news/newCenterList',
    method: 'get',
    params: {newsType,pageNum, pageSize}
  })
}

export function addNews(data) {
  return request({
    url: '/bulktrade/news',
    method: 'post',
    data: data
  })
}
