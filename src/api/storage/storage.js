import request from '@/utils/request'

export function saveWarehouseFindGoods(data){
  return request({
    url: `/warehouseFindGoods`,
    method: 'post',
    data: data
  })
}

export function saveGoodsFindWarehouse(data){
  return request({
    url: `/goodsFindWarehouse`,
    method: 'post',
    data: data
  })
}

export function getGoodsFindWarehouse(id) {
  return request({
    url: `/goodsFindWarehouse/info/${id}`,
    method: 'get',
  })
}

/**
* @Description:  面向用户的详情接口 2C
* @Param:
* @return:
*/
export function getWarehouseFindGoods2C(id) {
  return request({
    url: `/warehouseFindGoods/indexDetail/${id}`,
    method: 'get',
  })
}

export function getGoodsFindWarehouse2C(id) {
  return request({
    url: `/goodsFindWarehouse/indexDetail/${id}`,
    method: 'get',
  })
}

export function getWarehouseFindGoodsList2C({pageSize = 10, pageNum = 1}) {
  return request({
    url: `/warehouseFindGoods/indexList`,
    method: 'get',
    params: {pageSize, pageNum}
  })
}

export function getGoodsFindWarehouseList2C({pageSize = 10, pageNum = 1}) {
  return request({
    url: `/goodsFindWarehouse/indexList`,
    method: 'get',
    params: {pageSize, pageNum}
  })
}

export function getWarehouseFindGoods(id) {
  return request({
    url: `/warehouseFindGoods/info/${id}`,
    method: 'get',
  })
}

export function getHomeStorageList() {
  return request({
    url: `/warehouseFindGoods/index/list`,
    method: 'get',
  })
}

export function userFavoriteWarehouseFindGoods({pageNum, pageSize = 10}) {
  return request({
    url: `/favorite/userFavoriteWarehouseFindGoods`,
    method: 'get',
    params: {pageNum, pageSize}
  })
}

export function userFavoriteGoodsFindWarehouse({pageNum, pageSize = 10}) {
  return request({
    url: `/favorite/userFavoriteGoodsFindWarehouse`,
    method: 'get',
    params: {pageNum, pageSize}
  })
}
