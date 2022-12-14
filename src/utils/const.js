export const URL_PREFIX = ''

export const DICT_PRODUCT_LIST = '/goods/list';

export const DEFAULT_SHORT_CUT_MENUS = [{
  id: 30,
  parentId: '',
  title: "我发布的竞价交易",
  path: "/center/bidding"
},{
  id: 31,
  parentId: '',
  title: "我参与的竞价交易",
  path: "/center/bidding-join"
},{
  id: 34,
  parentId: '',
  title: "我发布的挂牌交易",
  path: "/center/listing"
},{
  id: 35,
  parentId: '',
  title: "我参与的挂牌交易",
  path: "/center/listing-join"
},{
  id: 38,
  parentId: '',
  title: "我的收藏",
  path: "/center/logistics/collect",
},{
  id: 43,
  parentId: '',
  title: "我的收藏",
  path: "/center/storage/collect",
}]

//自定义表单render类型
export const FORM_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  DATEPICKER: 'datepicker',
  DATE_TIME_PICKER: 'datetime',
  DATEPICKER_RANGE: 'datepicker_range',
  EDITOR: 'editor',
  FILE_UPLOAD: 'file-upload',
  IMAGE_UPLOAD: 'image-upload',
  ADDRESS_SELECT: 'address-select',
  ADDRESS_SELECT_RANGE: 'address_select_range',
  MY_SELECT: 'my_select',
  RENDER: 'render',
  INPUT_NUMBER: 'input-number',
  IMAGE_UPLOAD_GROUP: 'image_upload_group',
}

//0 车找货 1 货找车 2 仓找货 3 货找仓
export const NEWS_CLASS = {
  CAR_FIND_GOODS: 0,
  GOODS_FIND_CAR: 1,
  WAREHOUSE_FIND_GOODS: 2,
  GOODS_FIND_WAREHOUSE: 3,
}

export const ENABLE_STATUS = 0;
export const DISABLE_STATUS = 1;

export const NEWS_TYPE = [{
  label: '政策文件',
  value: 1
},{
  label: '行业新闻',
  value: 2
},{
  label: '综合研究',
  value: 3
}]


export const NEWS_STATUS = [{
  label: '草稿',
  value: 0
},{
  label: '已发布',
  value: 1
},{
  label: '已下架',
  value: 2
}]

export const LOGISTICS_COST_TYPE = [{
  label: '金额',
  value: 0
},{
  label: '面议',
  value: 1
}]

export const LOGISTICS_TYPE = [{
  label: '车找货',
  value: 0
},{
  label: '货找车',
  value: 1
}]


export const STORAGE_TYPE = [{
  label: '货找仓',
  value: NEWS_CLASS.GOODS_FIND_WAREHOUSE
},{
  label: '仓找货',
  value: NEWS_CLASS.WAREHOUSE_FIND_GOODS
}]

//商品分类0 商品1
export const PRODUCT_MANAGE_TYPE = {
  PRODUCT_CLASS: 0,
  PRODUCT: 1,
}

export const ACTIVITY_STATUS = [{
  label: '未开始',
  value: 1
},{
  label: '进行中',
  value: 2
},{
  label: '交易结束',
  value: 3
}]

export const ACTIVITY_TRANSACTION_STATUS = [{
  label: '无效',
  value: 0
},{
  label: '有效',
  value: 1
},{
  label: '部分有效',
  value: 2
}]

export const BIDDING_TRANSACTION_STATUS = [{
  label: '未成交',
  value: 0
},{
  label: '成交',
  value: 1
},{
  label: '部分成交',
  value: 2
}]

//挂牌状态 -1  标识还没提交过
export const LISTING_TRANSACTION_STATUS = [{
  label: '等待供货商进行确认',
  value: 0
},{
  label: '交易成功',
  value: 1
},{
  label: '交易结束',
  value: 2
}]


export const TRANSACTION_STATUS = [{
  label: '草稿',
  value: 0
},{
  label: '未开始',
  value: 1
},{
  label: '交易进行中 ',
  value: 2
},{
  label: '交易结束',
  value: 3
},{
  label: '交易成功',
  value: 4
}]

//竞价方式
export const BIDDING_METHOD = [{
  label: '公开竞价',
  value: 1
},{
  label: '密封竞价',
  value: 2
}]

//竞价类型
export const BIDDING_TYPE = [{
  label: '普通竞价',
  value: 1
},{
  label: '整拍竞价',
  value: 2
}]

//企业认证状态 0: 未认证 1 已认证 2 驳回认证
export const COMPANY_STATUS = [{
  label: '未完成企业认证',
  value: 0
},{
  label: '已提交企业认证',
  value: 1
},{
  label: '驳回认证',
  value: 2
},{
  label: '已通过认证',
  value: 3
}]

export const TRADE_STATUS = [{
  label: '允许发布交易',
  value: 0
},{
  label: '不允许发布交易',
  value: 1
}]

export const USER_STATUS = [{
  label: '正常',
  value: 0
},{
  label: '禁用',
  value: 1
}]

export const ENTERPRISE_AUDIT_TYPE = [{
  label: '认证资料',
  value: 0
},{
  label: '营运资料',
  value: 1
}]

export const ENTERPRISE_AUDIT_STATUS = [{
  label: '未审核',
  value: 0
},{
  label: '审核驳回',
  value: 2
},{
  label: '审核通过',
  value: 3
}]


export const MINUTES_LIST = Array.from(new Array(60).keys()).map(item => {
  const minute = item + 1
  return {
    label: minute + '分钟',
    value: minute
  }
})

export const getLabelByValue = (value, dict) => {
  if(!value){
    return ''
  }
  return dict.find(item => String(item.value) === String(value)).label
}

