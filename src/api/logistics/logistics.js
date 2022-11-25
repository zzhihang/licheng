import request from '@/utils/request'

export function goodsFindCar(data) {
  return request({
    url: '/goodsFindCar',
    method: 'post',
    data: data
  })
}

export function carFindGoods(data) {
  return request({
    url: '/carFindGoods',
    method: 'post',
    data: data
  })
}

export function userFavoriteGoodsFindCar({pageNum, pageSize = 10}) {
  return request({
    url: '/favorite/userFavoriteGoodsFindCar',
    method: 'get',
    params: {pageNum, pageSize}
  })
}

export function userFavoriteCarFindGoods({pageNum, pageSize = 10}) {
  return request({
    url: '/favorite/userFavoriteCarFindGoods',
    method: 'get',
    params: {pageNum, pageSize}
  })
}

/**
* @Description: 所有带2c的都是面向用户的接口
* @Param:
* @return:
*/
export function getGoodsFindCarList2c({pageNum=1, pageSize = 10}) {
  return request({
    url: '/goodsFindCar/indexList',
    method: 'get',
    params: {pageNum, pageSize}
  })
}

export function getCarFindGoodsList2c({pageNum=1, pageSize = 10}) {
  return request({
    url: '/carFindGoods/indexList',
    method: 'get',
    params: {pageNum, pageSize}
  })
}

export function getCarFindGoodsDetail2c(id) {
  return request({
    url: `/carFindGoods/indexDetail/${id}`,
    method: 'get',
  })
}

export function getGoodsFindCarDetail2c(id) {
  return request({
    url: `/goodsFindCar/indexDetail/${id}`,
    method: 'get',
  })
}

export function getCarFindGoods(id) {
  return request({
    url: `/carFindGoods/info/${id}`,
    method: 'get',
  })
}


export function getGoodsFindCar(id) {
  return request({
    url: `/goodsFindCar/info/${id}`,
    method: 'get',
  })
}

export function getHomeLogisticsList(id) {
  return request({
    url: `/goodsFindCar/index/list`,
    method: 'get',
  })
}
