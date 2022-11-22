import {MOBILE_VALIDATOR, NUMBER_VALIDATOR} from "@utils/validator";
import {DICT_PRODUCT_LIST, FORM_TYPE} from "@utils/const";

export const LISTING_ADD_MODEL = [{
  label: '商品名称',
  field: 'goodsName',
  type: FORM_TYPE.MY_SELECT,
  url: DICT_PRODUCT_LIST
},{
  label: '商品品级',
  field: 'goodsGrade',
  maxLength: 20
},{
  label: '商品单价',
  field: 'unitPrice',
  validator: NUMBER_VALIDATOR,
  maxLength: 20
},{
  label: '商品数量',
  field: 'num',
  validator: NUMBER_VALIDATOR
},{
  label: '单位',
  field: 'unit',
  maxLength: 20
},{
  label: '货源所在地',
  field: 'goodsOriginStr',
  type: FORM_TYPE.ADDRESS_SELECT,
  extraField: 'goodsOrigin' //额外传递的id字段
},{
  label: '生产企业',
  field: 'manufacturer',
  type: FORM_TYPE.TEXTAREA,
  maxLength: 100
},{
  label: '储存方式',
  field: 'storageMode',
  maxLength: 20
},{
  label: '交货方式',
  field: 'deliveryMode',
  maxLength: 20
},{
  type: FORM_TYPE.DATEPICKER,
  label: '交货时间',
  field: 'deliveryTime',
},{
  type: FORM_TYPE.DATEPICKER,
  label: '挂牌截止时间',
  field: 'listingEndTime',
  options: {
    disabledDate(time){
      return time.getTime() < Date.now();
    }
  }
},{
  label: '联系人',
  field: 'contact',
  maxLength: 20
},{
  label: '联系电话',
  field: 'tel',
  validator: MOBILE_VALIDATOR
},{
  type: FORM_TYPE.IMAGE_UPLOAD,
  label: '商品主图',
  field: 'mainImgUrl',
},{
  type: FORM_TYPE.IMAGE_UPLOAD,
  label: '商品细节图',
  field: 'imgUrls',
  limit: 3
}]
