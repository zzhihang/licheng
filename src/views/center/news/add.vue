<template>
  <div>
    <form-render ref="formRender" :data="formData">
      <el-button type="primary" @click="submitForm(0)">保存草稿</el-button>
      <el-button type="primary" @click="submitForm(1)">发布</el-button>
    </form-render>
  </div>
</template>

<script>
import FormRender from '@components/FormRender/FormRender'
import {FORM_TYPE, NEWS_TYPE} from "@utils/const";
import {addNews, getNewsDetail} from "@/api/news/news";

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
      }],
    }
  },
  created() {
    this.title = this.$route.meta.title
    if(this.$route.query.id){
      this.id = this.$route.query.id;
      this.getDetail();
    }
  },
  methods: {
    async getDetail(){
      const {data} = await getNewsDetail(this.id);
      this.$refs.formRender.setData(data.news)
    },
    submitForm(status) {
      this.$refs.formRender.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$callConfirm({
            info: '是否确定发布此资讯',
            tip: '发布后即时生效',
            hiddenConfirm: status === 0,
            onConfirm: async (done) => {
              const params = this.$refs.formRender.getData();
              params.status = status;
              if(this.id){
                params.id = this.id;
              }
              const result = await addNews(params);
              if(result.code === 200){
                this.$router.go(-1);
                this.$message.success(result.msg)
              }else{
                this.$message.error(result.msg)
              }
              done && done();
            }
          })
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
