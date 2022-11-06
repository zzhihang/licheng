import request from '@/utils/request'

export const getBrandList = () => request({ url: '/scf/productBrand/list', method: 'get' })
export const add = (data) => request({ url: '/scf/productBrand', method: 'post', data })
export const edit = (data) => request({ url: '/scf/productBrand', method: 'put', data })
export const del = (brandIds) => request({ url: `/scf/productBrand/${brandIds}`, method: 'delete' })
