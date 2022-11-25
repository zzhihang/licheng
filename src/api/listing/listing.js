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
    method: 'post',
  })
}
