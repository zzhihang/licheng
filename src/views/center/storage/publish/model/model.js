import {FORM_TYPE, LOGISTICS_COST_TYPE} from "@utils/const";
import {MOBILE_VALIDATOR} from "@utils/validator";

export const WAREHOUSE_FIND_GOODS_MODEL = [{
  type: FORM_TYPE.INPUT,
  label: '标题名称',
  field: 'title',
  asTitle: true,
  maxLength: 40
},{
  type: FORM_TYPE.ADDRESS_SELECT,
  label: '所在区域',
  field: 'districtStr',
  extraField: 'districtId' //额外传递的id字段
},{
  type: FORM_TYPE.TEXTAREA,
  label: '详细地址',
  field: 'address',
},{
  type: FORM_TYPE.INPUT_NUMBER,
  label: '面积',
  field: 'area',
  min: 0
},{
  type: FORM_TYPE.RADIO,
  label: '费用类型',
  field: 'costType',
  options: LOGISTICS_COST_TYPE,
  defaultValue: 0
},{
  type: FORM_TYPE.INPUT_NUMBER,
  label: '租金',
  field: 'cost',
  min: 0,
  precision: 2
},{
  type: FORM_TYPE.TEXTAREA,
  label: '厂房服务',
  field: 'service'
},{
  type: FORM_TYPE.INPUT,
  label: '联系人',
  field: 'contact'
},{
  type: FORM_TYPE.INPUT,
  label: '联系电话',
  field: 'tel',
  validator: MOBILE_VALIDATOR
},{
  type: FORM_TYPE.IMAGE_UPLOAD,
  label: '厂房照片',
  field: 'imgs'
}]

export const GOODS_FIND_WAREHOUSE_MODEL = [{
  type: FORM_TYPE.INPUT,
  label: '标题名称',
  field: 'title',
  asTitle: true,
  maxLength: 40
},{
  type: FORM_TYPE.ADDRESS_SELECT,
  label: '所在区域',
  field: 'districtStr',
  extraField: 'districtId' //额外传递的id字段
},{
  type: FORM_TYPE.TEXTAREA,
  label: '详细地址',
  field: 'address',
},{
  type: FORM_TYPE.INPUT_NUMBER,
  label: '面积要求',
  field: 'requireArea',
  min: 0
},{
  type: FORM_TYPE.RADIO,
  label: '费用类型',
  field: 'costType',
  options: LOGISTICS_COST_TYPE,
  defaultValue: 0
},{
  type: FORM_TYPE.INPUT_NUMBER,
  label: '租金预算',
  field: 'cost',
  min: 0,
  precision: 2
},{
  type: FORM_TYPE.TEXTAREA,
  label: '具体要求',
  field: 'details',
  maxLength: 300
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
