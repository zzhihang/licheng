import request from '@/utils/request'

export const getCompanyList = () => request({ url: '/scf/enterpriseCategory/list', method: 'get' })
export const add = (data) => request({ url: '/scf/enterpriseCategory', method: 'post', data })
export const edit = (data) => request({ url: '/scf/enterpriseCategory', method: 'put', data })
export const del = (entcategoryId) => request({ url: `/scf/enterpriseCategory/${entcategoryId}`, method: 'delete' })
