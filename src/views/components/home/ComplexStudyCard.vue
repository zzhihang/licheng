<template>
  <el-card class="complex-card" :class="type">
    <div style="padding: 20px;">
      <h6 class="ellipsis2">全国疫情仍呈现“点多、面广”特点，国庆期</h6>
      <p>国家疾控局传防司司长、一级巡视员雷正龙表备份一级巡视员雷正龙表备份一一级巡视员雷正龙表备份级巡视员雷正龙表备份一级巡视员雷正龙表备份一级巡视员雷正龙表备份一级巡视员雷正龙表备份一级巡视员雷正龙表备份一级巡视员雷正龙表备份一级巡视员雷正龙表备份</p>
      <div class="bottom">
        <el-button :type="type" size="mini" class="button">查看详情</el-button>
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
  }
}
</script>

<style lang="scss" scoped>
.complex-card{
  width: 400px;
  height: 278px;
  padding: 0;
  &.primary{
    background: url("../../../assets/images/stucard-card-bg.png");
    background-size: cover;
    h6{
      color: #FFFFFF;
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
    margin-top: 10px;
    margin-bottom: 16px;
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
