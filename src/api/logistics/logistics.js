import request from '@/utils/request'

export function goodsFindCar(data) {
  return request({
    url: '/goodsFindCar',
    method: 'post',
    data: data
  })
}
