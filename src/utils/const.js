export const URL_PREFIX = ''

export const DICT_PRODUCT_LIST = '/goods/list';

//自定义表单render类型
export const FORM_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  DATEPICKER: 'datepicker',
  DATEPICKER_RANGE: 'datepicker_Range',
  EDITOR: 'editor',
  FILE_UPLOAD: 'file-upload',
  IMAGE_UPLOAD: 'image-upload',
  ADDRESS_SELECT: 'address-select',
  ADDRESS_SELECT_RANGE: 'address_select_range',
  MY_SELECT: 'my_select',
}

//0 车找货 1 货找车 2 仓找货 3 货找仓
export const NEWS_CLASS = {
  CAR_FIND_GOODS: 0,
  GOODS_FIND_CAR: 1,
  WAREHOUSE_FIND_GOODS: 2,
  GOODS_FIND_WAREHOUSE: 3,
}

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

export const TRANSACTION_STATUS = [{
  label: '草稿',
  value: 0
},{
  label: '交易进行中',
  value: 1
},{
  label: '交易成功',
  value: 2
},{
  label: '交易结束',
  value: 3
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

export const MINUTES_LIST = Array.from(new Array(60).keys()).map(item => {
  const minute = item + 1
  return {
    label: minute + '分钟',
    value: minute
  }
})

export const getLabelByValue = (value, dict) => {
  return dict.find(item => String(item.value) === String(value)).label
}

