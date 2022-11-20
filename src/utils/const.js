export const URL_PREFIX = ''

//自定义表单render类型
export const FORM_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  DATEPICKER: 'datepicker',
  EDITOR: 'editor',
  FILE_UPLOAD: 'file-upload',
  IMAGE_UPLOAD: 'image-upload',
  ADDRESS_SELECT: 'address-select',
  ADDRESS_SELECT_RANGE: 'address_select_range',
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


export const getLabelByValue = (value, dict) => {
  return dict.find(item => item.value === value).label
}

