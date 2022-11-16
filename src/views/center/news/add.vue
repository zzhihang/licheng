<template>
  <div>
    <form-render ref="formRender" :data="formData"></form-render>
    <div class="form-button-box">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" plain @click="submitForm(1)">发布</el-button>
      <el-button type="primary" @click="resetForm()" plain>重置</el-button>
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
        type: FORM_TYPE.IMAGE_UPLOAD,
        label: '封面  ',
        field: 'cover'
      },{
        type: FORM_TYPE.RADIO,
        label: '资讯类型',
        field: 'newsType',
        options: NEWS_TYPE
      },{
        type: FORM_TYPE.EDITOR,
        label: '正文',
        field: 'content',
      }]
    }
  },
  created() {
    this.title = this.$route.meta.title
  },
  methods: {
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.$refs.formRender.getData();
          params.status = status;
          params.cover = 'https://wx2.sinaimg.cn/mw2000/001PqFBDgy1h82dkk3yezj66qo8aokjt02.jpg' //TODO test
          const result = await addNews(params);
          if(result.code === 200){
            this.$router.go(-1);
            this.$message.success(result.msg)
          }else{
            this.$message.error(result.msg)
          }
        } else {
          return false;
        }
      })
    },
    resetForm(){
      this.$refs.formRender.resetForm()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
