import request from "@utils/request";

export function addBidding(data) {
  return request({
    url: `/bidding`,
    method: 'post',
    data: data
  })
}
