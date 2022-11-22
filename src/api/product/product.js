import request from '@/utils/request'

export function getGoodsList() {
  return request({
    url: '/goods/listAll',
    method: 'get',
  })
}

//添加/更新 类别
export function addGoodsType(data) {
  return request({
    url: '/goodsType',
    method: 'post',
    data
  })
}

//添加/更新 商品
export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

//商品列表
export function getProductList(name='') {
  return request({
    url: '/goods/list',
    method: 'get',
    params: {
      name
    }
  })
}




