<template>
  <el-footer>
    <div class="w footer-container">
      <ul>
        <li v-for="(item, index) in links" :key="index">{{item.name}}</li>
      </ul>
      <p>鲁B2-2005***17号传真：0533-6090800 Email：Master@sci99.com</p>
    </div>
  </el-footer>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
  data(){
    return {
      links: [{
        name: '网站首页',
        link: ''
      },{
        name: '帮助中心',
        link: ''
      },{
        name: '联系我们',
        link: ''
      },{
        name: '招聘信息',
        link: ''
      },{
        name: '客户服务',
        link: ''
      },{
        name: '隐私政策',
        link: ''
      },{
        name: '广告服务',
        link: ''
      },{
        name: '网站地图',
        link: ''
      },{
        name: '意见反馈',
        link: ''
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-footer{
    background: #37405E;
    height: 200px !important;
  }
  .footer-container{
    padding-top: 80px;
    padding-bottom: 30px;
    text-align: center;
    ul{
      display: flex;
      justify-content: center;
    }
    li{
      color: #FFFFFF;
      line-height: 20px;
      font-size: 14px;
      margin-right: 25px;
    }
    p{
      margin-top: 50px;
      font-size: 14px;
      color: #DADADA;
    }
  }
</style>
