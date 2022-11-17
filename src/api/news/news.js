import request from '@/utils/request'

export function newCenterList({newsType = 1, pageNum = 1, pageSize = 10}) {
  return request({
    url: '/news/newCenterList',
    method: 'get',
    params: {newsType,pageNum, pageSize}
  })
}

export function userCenterNewsList({title = '', pageNum = 1, pageSize = 10}) {
  return request({
    url: '/news/list',
    method: 'get',
    params: {title, pageNum, pageSize}
  })
}

export function addNews(data) {
  return request({
    url: '/goodsFindCar',
    method: 'post',
    data: data
  })
}
