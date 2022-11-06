import request from '@/utils/request'

export const getCategoryList = () => request({ url: '/scf/productCategory/list', method: 'get' })
export const productTree = (params) => request({ url: `/scf/productCategory/tree/list`, method: 'get', params })
export const add = (data) => request({ url: '/scf/productCategory', method: 'post', data })
export const edit = (data) => request({ url: '/scf/productCategory', method: 'put', data })
export const del = (categoryIds) => request({ url: `/scf/productCategory/${categoryIds}`, method: 'delete' })
