<template>
  <div class="form-render">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-form-item v-for="(item, index) in data"
                    :label="item.label"
                    :prop="item.field"
                    :key="index"
      >
        <el-select v-if="item.type === FORM_TYPE.SELECT"
                   v-model="ruleForm[item.field]"
                   :placeholder="item.placeholder || ('请选择' + item.label)">
          <el-option v-for="(option, i) in item.options"
                     :key="i"
                     :label="option.label"
                     :value="option.value">
          </el-option>
        </el-select>

        <el-radio-group v-else-if="item.type === FORM_TYPE.RADIO" v-model="ruleForm[item.field]">
          <el-radio v-for="(option, i) in item.options" :label="option.value">{{option.label}}</el-radio>
        </el-radio-group>

        <el-input v-else-if="item.type === FORM_TYPE.TEXTAREA"
                  v-model="ruleForm[item.field]"
                  type="textarea"
                  :maxlength="item.maxLength"
                  :show-word-limit="true"
                  :placeholder="item.placeholder || ('请输入' + item.label)"
        ></el-input>

        <el-input-number v-else-if="item.type === FORM_TYPE.INPUT_NUMBER"
                  v-model="ruleForm[item.field]"
                  :precision="item.precision"
                  :min="item.min"
                  :max="item.max"
                  type="textarea"
                  :maxlength="item.maxLength"
        ></el-input-number>

        <el-date-picker
          v-else-if="item.type === FORM_TYPE.DATEPICKER"
          v-model="ruleForm[item.field]"
          :value-format="item.format || 'yyyy-MM-dd'"
          type="date"
          :picker-options="item.options"
          :placeholder="item.placeholder || ('请选择' + item.label)"
        >
        </el-date-picker>

        <el-date-picker
          v-else-if="item.type === FORM_TYPE.DATE_TIME_PICKER"
          v-model="ruleForm[item.field]"
          type="datetime"
          :picker-options="item.options"
          value-format="yyyy-MM-dd hh:mm:ss"
          :placeholder="item.placeholder || ('请选择' + item.label)"
        >
        </el-date-picker>

        <editor v-else-if="item.type === FORM_TYPE.EDITOR" v-model="ruleForm[item.field]" :minHeight="300"/>

        <file-upload v-else-if="item.type === FORM_TYPE.FILE_UPLOAD" v-model="ruleForm[item.field]"/>


        <image-upload v-else-if="item.type === FORM_TYPE.IMAGE_UPLOAD"
                      v-model="ruleForm[item.field]"
                      :tip="item.tip"
                      :limit="item.limit"
        />

        <div class="image-upload-group" v-else-if="item.type === FORM_TYPE.IMAGE_UPLOAD_GROUP">
          <image-upload
            v-for="(child, index) in item.fields"
            :key="index"
            v-model="ruleForm[child]"
            :limit="item.limit"
            :is-show-tip="item.isShowTip"
            :tip="(item.tips || [])[index]"
          />
        </div>

        <el-cascader
          v-else-if="item.type === FORM_TYPE.ADDRESS_SELECT"
          size="small"
          :options="options"
          v-model="ruleForm[item.extraField]"
          @change="onAddressChange($event, item.field, item.extraField)">
        </el-cascader>

        <div style="display: flex; align-items: center"
             v-else-if="item.type === FORM_TYPE.ADDRESS_SELECT_RANGE"
        >
          <el-cascader
            size="small"
            style="margin-right: 8px;"
            :options="options"
            v-model="ruleForm[item.extraField1]"
            @change="onAddressChange($event, item.field1, item.extraField1)">
          </el-cascader>
          <el-cascader
            size="small"
            :options="options"
            v-model="ruleForm[item.extraField1]"
            @change="onAddressChange($event, item.field2, item.extraField2)">
          </el-cascader>
        </div>

        <my-select v-else-if="item.type === FORM_TYPE.MY_SELECT"
                   v-model="ruleForm[item.field]"
                   :placeholder="item.placeholder || ('请选择' + item.label)"
                   :url="item.url"
        ></my-select>

        <el-input v-else
                  v-model="ruleForm[item.field]"
                  :maxlength="item.maxLength"
                  :placeholder="item.placeholder || ('请填写' + item.label)"
        >
          <template v-if="item.append" slot="append">{{item.append}}</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="form-button-box">
      <slot></slot>
      <confirm-button type="primary" @onConfirm="resetForm" info="是否确定清空表单" tip="清空后将无法恢复" plain>清空</confirm-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {FORM_TYPE} from "@utils/const";
import {getAppList} from "@/api/common";
import Editor from '@components/Editor'
import FileUpload from '@components/FileUpload'
import ImageUpload from '@components/ImageUpload'
import { regionData, CodeToText } from 'element-china-area-data'
import MySelect from "@components/mine/MySelect/MySelect";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";

export default {
  components: {
    Editor,
    FileUpload,
    ImageUpload,
    MySelect,
    ConfirmButton
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      FORM_TYPE: FORM_TYPE,
      options: regionData,
      ruleForm: {},
      rules: {}
    };
  },
  watch: {
    data: {
      handler(val) {
        const form = {};
        const rules = {};
        this.data.forEach(item => { //自动生成ruleForm
          if(item.field){
            if(item.defaultValue === undefined){
              form[item.field] =  ''
            }else{
              form[item.field] =  item.defaultValue
            }
            //生成rules
            rules[item.field] = [{required: item.required !== false, message: '请填写必填项'}]
            if(item.validator){
              if(Array.isArray(item.validator)){
                rules[item.field].concat(item.validator)
              }else{
                rules[item.field].push(item.validator)
              }
            }
          }
        })
        this.ruleForm = form;
        this.rules = rules
      },
      immediate: true
    },
  },
  methods: {
    getData(){
      return this.ruleForm;
    },
    onAddressChange(e, field, extraField){
      this.ruleForm[field] = CodeToText[e[0]] + CodeToText[e[1]] + CodeToText[e[2]];
      this.ruleForm[extraField] = e[0] + ',' + e[1] + ',' + e[2]
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    setData(data){
      this.ruleForm = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-render{
    background: rgba(246,247,250,0.75);
    border-radius: 5px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 100px;
  }
  .image-upload-group{
    display: flex;
    align-items: center;
    .component-upload-image{
      margin-right: 10px;
    }
  }
</style>
