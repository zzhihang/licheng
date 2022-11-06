import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    // url: '/getRouters',
    url: '/system/menu/getRouters',
    method: 'get',
    params: { appCode: '' }
  })
}
