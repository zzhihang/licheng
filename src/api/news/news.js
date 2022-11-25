import request from '@/utils/request'


//0 资讯类型 1 政策文件 2 行业新闻 3 综合研究
export function newCenterList({newsType = 0, pageNum = 1, pageSize = 10}) {
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
    url: '/news',
    method: 'post',
    data: data
  })
}

export function getNewsDetail(id) {
  return request({
    url: `/news/newsDetail/${id}`,
    method: 'get'
  })
}

export function getNewsHotList(id) {
  return request({
    url: `/news/hotList`,
    method: 'get'
  })
}

export function getHomeNewsList(id) {
  return request({
    url: `/news/index/list`,
    method: 'get'
  })
}


