import {FORM_TYPE, LOGISTICS_COST_TYPE} from "@utils/const";
import {ID_CARD_VALIDATOR, MOBILE_VALIDATOR, NUMBER_CODE_VALIDATOR} from "@utils/validator";

export const ENTERPRISE_MODEL = [{
  label: '企业名称',
  field: 'name',
  maxLength: 100
},{
  label: '信用代码',
  field: 'code',
  validator: NUMBER_CODE_VALIDATOR,
  maxLength: 18
},{
  label: '法人姓名',
  field: 'legalPerson',
  maxLength: 20
},{
  label: '企业联系人',
  field: 'contact',
  maxLength: 20
},{
  label: '企业联系人身份证号',
  field: 'contactIdNum',
  validator: ID_CARD_VALIDATOR
},{
  label: '联系电话',
  field: 'tel',
  validator: MOBILE_VALIDATOR
},{
  type: FORM_TYPE.IMAGE_UPLOAD_GROUP,
  label: '上传证件照',
  fields: ['contactIdNumFront', 'contactIdNumBack', 'businessLicense'],
}]

export const ENTERPRISE_OPERATE_MODEL = [{
  label: '道路运输许可证编号',
  field: 'transportNo',
  maxLength: 100
},{
  label: '驾驶员姓名',
  field: 'driver',
  validator: NUMBER_CODE_VALIDATOR,
  maxLength: 18
},{
  label: '驾驶员身份证号',
  field: 'driverIdNum',
  maxLength: 20
},{
  label: '企业营运联系人',
  field: 'operateContact',
  maxLength: 20
},{
  label: '联系电话',
  field: 'operateTel',
  validator: ID_CARD_VALIDATOR
},{
  type: FORM_TYPE.IMAGE_UPLOAD_GROUP,
  label: '上传证件照',
  fields: ['transportLicense', 'driverLicense', 'driverIdNumFront', 'driverIdNumBack'],
}]
