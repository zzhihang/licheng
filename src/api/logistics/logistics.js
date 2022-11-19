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
export function goodsFindCar2c({pageNum, pageSize = 10}) {
  return request({
    url: '/goodsFindCar/indexList',
    method: 'get',
    params: {pageNum, pageSize}
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
