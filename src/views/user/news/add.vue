<template>
  <div>
    <form-render ref="formRender" :data="formData"></form-render>
    <div>
      <el-button type="primary" @click="submitForm()">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FormRender from '@components/FormRender/FormRender'
import {FORM_TYPE, NEWS_TYPE} from "@utils/const";
import {addNews} from "@/api/news/news";
export default {
  components: {
    FormRender
  },
  data() {
    return {
      formData: [{
        type: FORM_TYPE.INPUT,
        label: '标题',
        field: 'title'
      },{
        type: FORM_TYPE.RADIO,
        label: '资讯类型',
        field: 'newsType',
        options: NEWS_TYPE
      },{
        type: FORM_TYPE.TEXTAREA,
        label: '正文',
        field: 'content',
      }]
    }
  },
  methods: {
    submitForm() {
      debugger
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.$refs.formRender.getData();
          params.cover = 'https://wx2.sinaimg.cn/mw2000/001PqFBDgy1h82dkk3yezj66qo8aokjt02.jpg' //TODO test
          params.status = 1;
          const {data} = await addNews(params);
        } else {
          return false;
        }
      })
    },
    resetForm(){

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
