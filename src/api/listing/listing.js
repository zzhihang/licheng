import request from "@utils/request";

export function addListing(data) {
  return request({
    url: `/listing`,
    method: 'post',
    data: data
  })
}

export function getListingDetail(id) {
  return request({
    url: `/listing/info/${id}`,
    method: 'get',
  })
}

export function getIndexListingInfo(id) {
  return request({
    url: `/listing/centerInfo/${id}`,
    method: 'get',
  })
}

//挂牌交易-摘牌
export function pickListing(id) {
  return request({
    url: `/listing/pick/${id}`,
    method: 'get',
  })
}
