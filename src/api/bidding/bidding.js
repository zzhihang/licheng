import request from "@utils/request";

export function addBidding(data) {
  return request({
    url: `/bidding`,
    method: 'post',
    data: data
  })
}

/**
* @Description:  首页竞价列表
* @Param:
* @return:
*/
export function getHomeBidingList() {
  return request({
    url: `/bidding/index/list`,
    method: 'get',
  })
}
