import {MOBILE_VALIDATOR, NUMBER_VALIDATOR} from "@utils/validator";
import {BIDDING_METHOD, DICT_PRODUCT_LIST, FORM_TYPE, MINUTES_LIST} from "@utils/const";

export const BIDDING_ADD_MODEL = [{
  label: '竞价活动名称',
  field: 'title',
  maxLength: 20
},{
  label: '竞价方式',
  field: 'method',
  type: FORM_TYPE.RADIO,
  options: BIDDING_METHOD
},{
  label: '竞价活动介绍',
  field: 'introduction',
  maxLength: 300,
  type: FORM_TYPE.TEXTAREA
},{
  label: '商品规格描述',
  field: 'description',
  maxLength: 300,
  type: FORM_TYPE.TEXTAREA
},{
  label: '供货商联系电话',
  field: 'supplierTel',
  validator: MOBILE_VALIDATOR
},{
  label: '竞价商品名称',
  field: 'goodsId',
  type: FORM_TYPE.MY_SELECT,
  url: DICT_PRODUCT_LIST
},{
  label: '竞价商品总量',
  field: 'goodsNum',
  maxLength: 20
},{
  label: '单位',
  field: 'unit',
  defaultValue: '吨'
},{
  type: FORM_TYPE.DATEPICKER,
  label: '竞价开始时间',
  field: 'startTime',
  options: {
    disabledDate(time){
      return time.getTime() < Date.now();
    }
  }
},{
  type: FORM_TYPE.DATEPICKER,
  label: '竞价结束时间',
  field: 'endTime',
  options: {
    disabledDate(time){
      return time.getTime() < Date.now();
    }
  }
},{
  type: FORM_TYPE.DATEPICKER,
  label: '交货有效期起始时间',
  field: 'deliveryStartTime',
  options: {
    disabledDate(time){
      return time.getTime() < Date.now();
    }
  }
},{
  type: FORM_TYPE.DATEPICKER,
  label: '交货有效期结束时间',
  field: 'deliveryEndTime',
  options: {
    disabledDate(time){
      return time.getTime() < Date.now();
    }
  }
},{
  type: FORM_TYPE.DATEPICKER,
  label: '底价单价',
  field: 'baseUnitPrice',
},{
  type: FORM_TYPE.DATEPICKER,
  label: '加价幅度',
  field: 'increasePrice',
},{
  type: FORM_TYPE.SELECT,
  label: '延长时间',
  field: 'expandTime',
  options: MINUTES_LIST
}]
