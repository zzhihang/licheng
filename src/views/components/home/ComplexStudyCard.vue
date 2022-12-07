<template>
  <el-card class="complex-card" :class="`${type} ${size}`" shadow="never">
    <h6 class="ellipsis2">{{data.title}}</h6>
    <div class="content-box">
      <p :class="size === 'large' ? 'ellipsis3' : 'ellipsis1'">{{data.content}}</p>
      <div class="bottom">
        <el-button :type="type" size="mini" class="button" @click="$router.push({path: `/news/${data.id}`})">查看详情</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    type: {
      type: String,
      default: 'default'  //default为白色
    },
    size: {
      type: String,
      default: 'large' //or small
    },
    data: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style lang="scss" scoped>
.complex-card{
  width: 400px;
  height: 278px;
  padding: 30px 24px 40px;
  box-sizing: border-box;
  border-radius: 0;
  &.small{
    height: 139px;
    padding: 24px 23px;
    background: #E5E8F1;
    p{
      height: 21px;
      margin-bottom: 0;
      padding-right: 60px;
    }
    .content-box{
      display: flex;
      justify-content: space-between;
    }
  }
  .el-button{
    background-color: #2468F2;
    color: #FFFFFF;
  }
  &.primary{
    background: url("../../../assets/images/stucard-card-bg.png");
    background-size: cover;
    .el-button--primary{
      background-color: #FFFFFF;
      color: #2468F2;
    }
    h6{
      color: #FFFFFF;
      line-height: 25px;
    }
    p{
      color: #EAEAEA;
    }
  }
  ::v-deep .el-card__body{
    padding: 0;
  }
  img{
    width: 100%;
    height: 150px;
  }
  h6{
    color: #000000;
    font-size: 16px;
    font-weight: bold;
  }
  p{
    font-size: 14px;
    color: #666666;
    line-height: 21px;
    margin-top: 20px;
    margin-bottom: 24px;
    height: 84px;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .source{
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>
