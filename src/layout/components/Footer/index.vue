<template>
  <el-footer>
    <div class="w footer-container">
      <div class="links">
        <ul>
          <li v-for="(item, index) in links" :key="index">{{item.name}}</li>
        </ul>
        <div class="intro-box">
          <div class="intro">
            <h2>联系我们</h2>
            <p>中国（山东）自由贸易试验区济南片区唐冶西路868号山东创意园北区7号楼1-1307室</p>
            <p class="phone"><img :src="require('@images/phone.png')" alt=""><span>0531-80961967</span></p>
          </div>
          <div class="er-wei-ma">
            <img :src="require('@images/erweima.png')" alt="">
            <p>微信公众号</p>
          </div>
        </div>
      </div>

     <div class="copy-right">
       <p>鲁B2-2005***17号传真：0533-6090800 Email：Master@sci99.com</p>
       <p>版权所有：山东同信信息科技有限公司备案号 | 鲁ICP备2022002820号</p>
     </div>
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
    height: 316px !important;
  }
  .footer-container{
    padding-top: 46px;
    padding-bottom: 30px;
    .links{
      display: flex;
      justify-content: space-between;
    }
    ul{
      width: 500px;
    }
    li{
      color: #FFFFFF;
      line-height: 20px;
      font-size: 14px;
      margin-right: 25px;
      display: inline-block;
      height: 20px;
      margin-bottom: 20px;
    }
    .intro-box{
      display: flex;
      color: #FFFFFF;
      line-height: 22px;
      width: 360px;
      .intro{
        flex: 1;
        p{
          margin-top: 20px;
        }
      }
      .er-wei-ma{
        flex-shrink: 0;
        margin-left: 40px;
      }
    }
    .phone{
      display: flex;
      align-items: center;
      margin-top: 15px;
      img{
        margin-right: 10px;
      }
    }
    .copy-right{
      margin-top: 46px;
      color: #DADADA;
      line-height: 17px;
      font-size: 12px;
      text-align: center;
    }
  }
</style>
