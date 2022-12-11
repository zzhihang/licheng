import {MOBILE_VALIDATOR, NUMBER_VALIDATOR} from "@utils/validator";
import {BIDDING_METHOD, DICT_PRODUCT_LIST, FORM_TYPE, MINUTES_LIST} from "@utils/const";

const part1 = [{
  label: '竞价活动名称',
  field: 'title',
  maxLength: 20
},{
  label: '竞价方式',
  field: 'method',
  type: FORM_TYPE.RADIO,
  options: BIDDING_METHOD,
  defaultValue: 1
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
  type: FORM_TYPE.INPUT_NUMBER,
  min: 1
},{
  label: '单位',
  field: 'unit',
  defaultValue: '吨'
}]

const part2 = [{
  label: '最小购买量',
  field: 'minNum',
  validator: NUMBER_VALIDATOR
},{
  label: '最大购买量',
  field: 'maxNum',
  validator: NUMBER_VALIDATOR
}]

const part3 = [{
  type: FORM_TYPE.DATEPICKER,
  label: '竞价开始时间',
  field: 'startTime',
  // options: {
  //   disabledDate(time){
  //     return time.getTime() < Date.now();
  //   }
  // }
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
  label: '底价单价',
  field: 'baseUnitPrice',
  type: FORM_TYPE.INPUT_NUMBER,
  min: 0.01
},{
  label: '加价幅度',
  field: 'increasePrice',
  type: FORM_TYPE.INPUT_NUMBER,
  min: 0.01
},{
  type: FORM_TYPE.SELECT,
  label: '延长时间',
  field: 'expandTime',
  options: MINUTES_LIST
}]

export const BIDDING_ADD_MODEL = part1.concat(part3)

export const BIDDING_ADD_MODEL_ORDINARY = part1.concat(part2).concat(part3);
