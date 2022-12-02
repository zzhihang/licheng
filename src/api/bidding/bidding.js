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

/**
* @Description: 竞价交易-详情
* @Param:
* @return:
*/

export function getBiddingInfo(id) {
  return request({
    url: `/bidding/centerInfo/${id}`,
    method: 'get',
  })
}

/**
 * @Description: 竞价交易-报价
 * @Param:
 * @return:
 */
export function saveBiddingOffer({id, price, num}) {
  return request({
    url: `/bidding/offer`,
    method: 'get',
    params: {id, price, num}
  })
}

/**
 * @Description: 刷新最高报价
 * @Param:
 * @return:
 */
export function getBiddingMaxPrice(biddingId) {
  return request({
    url: `/bidding/maxPrice/${biddingId}`,
    method: 'get',
  })
}

/**
 * @Description: 商品绑定的企业列表
 * @Param:
 * @return:
 */
export function getBiddingCompanyList(goodsId) {
  return request({
    url: `/biddingCompany/list/${goodsId}`,
    method: 'get',
  })
}

/**
 * @Description: 商品绑定的企业列表
 * @Param:
 * @return:
 */
export function saveBiddingCompanyList({goodsId, data}) {
  return request({
    url: `/biddingCompany/save/${goodsId}`,
    method: 'post',
    data
  })
}
