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

export function getWarehouseFindGoods(id) {
  return request({
    url: `/warehouseFindGoods/info/${id}`,
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

