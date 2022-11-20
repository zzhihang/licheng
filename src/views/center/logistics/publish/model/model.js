import {FORM_TYPE, LOGISTICS_COST_TYPE} from "@utils/const";
import {MOBILE_VALIDATOR} from "@utils/validator";

export const CAR_FIND_GOODS_MODEL = [{
  type: FORM_TYPE.INPUT,
  label: '标题名称',
  field: 'title',
  asTitle: true
},{
  type: FORM_TYPE.ADDRESS_SELECT_RANGE,
  label: '运输路线',
  field1: 'fromDistrictStr',
  field2: 'toDistrictStr',
  extraField1: 'fromDistrictId',
  extraField2: 'toDistrictId',
},{
  type: FORM_TYPE.TEXTAREA,
  label: '车型和载重',
  field: 'details',
},{
  type: FORM_TYPE.RADIO,
  label: '费用类型',
  field: 'costType',
  options: LOGISTICS_COST_TYPE,
  defaultValue: 0
},{
  type: FORM_TYPE.INPUT,
  label: '运费',
  field: 'cost',
  append: '元/吨'
},{
  type: FORM_TYPE.INPUT,
  label: '联系人',
  field: 'contact',
  maxLength: 20
},{
  type: FORM_TYPE.INPUT,
  label: '联系电话',
  field: 'tel',
  validator: MOBILE_VALIDATOR
}]

export const GOODS_FIND_CAR_MODEL = [{
  type: FORM_TYPE.INPUT,
  label: '标题名称',
  field: 'title',
  asTitle: true
},{
  type: FORM_TYPE.ADDRESS_SELECT,
  label: '装货地点',
  field: 'fromDistrictStr',
  extraField: 'fromDistrictId' //额外传递的id字段
},{
  type: FORM_TYPE.TEXTAREA,
  label: '详细地址',
  field: 'fromAddress',
},{
  type: FORM_TYPE.INPUT,
  label: '商品名称',
  field: 'goodsName',
},{
  type: FORM_TYPE.INPUT,
  label: '商品重量',
  field: 'weight'
},{
  type: FORM_TYPE.DATEPICKER,
  label: '装货日期',
  field: 'loadingDate'
},{
  type: FORM_TYPE.ADDRESS_SELECT,
  label: '收货地点',
  field: 'toDistrictStr',
  extraField: 'toDistrictId' //额外传递的id字段
},{
  type: FORM_TYPE.TEXTAREA,
  label: '具体要求',
  field: 'details'
},{
  type: FORM_TYPE.INPUT,
  label: '联系人',
  field: 'contact'
},{
  type: FORM_TYPE.INPUT,
  label: '联系电话',
  field: 'tel',
  validator: MOBILE_VALIDATOR
}]
