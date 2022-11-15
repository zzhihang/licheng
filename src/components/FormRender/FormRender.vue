<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item v-for="(item, index) in data" :label="item.label" :prop="item.field" :key="index">
        <el-input v-if="item.type === FORM_TYPE.INPUT"
                  v-model="ruleForm[item.field]"
                  :placeholder="item.placeholder || ('请填写' + item.label)">
        </el-input>

        <el-select v-if="item.type === FORM_TYPE.SELECT"
                   v-model="ruleForm[item.field]"
                   :placeholder="item.placeholder || ('请选择' + item.label)">
          <el-option v-for="(option, i) in item.options"
                     :key="i"
                     :label="option.label"
                     :value="option.value">
          </el-option>
        </el-select>

        <el-radio-group v-if="item.type === FORM_TYPE.RADIO" v-model="ruleForm[item.field]">
          <el-radio v-for="(option, i) in item.options" :label="option.value">{{option.label}}</el-radio>
        </el-radio-group>

        <el-input v-if="item.type === FORM_TYPE.TEXTAREA"
                  v-model="ruleForm[item.field]"
                  type="textarea"
        ></el-input>

        <el-input v-if="item.type === FORM_TYPE.CHECKBOX"
                  v-model="ruleForm[item.field]"
                  type="textarea"
        ></el-input>

        <el-checkbox-group v-if="item.type === FORM_TYPE.CHECKBOX" v-model="ruleForm[item.field]">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>

      </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue';
import {FORM_TYPE} from "@utils/const";
import {getAppList} from "@/api/common";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      FORM_TYPE: FORM_TYPE,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    data: {
      handler(val) {
        const form = {}
        this.data.forEach(item => { //自动生成ruleForm
          form[item.field] = item.defaultValue || ''
        })
        this.ruleForm = form;
      },
      immediate: true
    },
  },
  methods: {
    getData(){
      return this.ruleForm;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('onSubmitClick', this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
