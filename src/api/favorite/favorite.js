import request from "@utils/request";

/**
* @Description:
* @Param:  favoriteType 0 车找货 1 货找车 2 仓找货 3 货找仓
* @return:
*/
export function addFavorite({businessId, favoriteType}) {
  return request({
    url: `/favorite/newFavorite`,
    method: 'get',
    params: {businessId, favoriteType}
  })
}
