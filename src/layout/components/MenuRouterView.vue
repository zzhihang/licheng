<template>
  <div class="my-container w">
    <panel-container />
    <div class="main-box" >
      <div class="right-panel">
        <h1 class="panel-title">
          <div>
            <span>{{ title }}</span>
            <p>{{subTitle}}</p>
          </div>
          <el-button @click="$router.go(-1)">返回<i class="el-icon-back"></i></el-button>
        </h1>
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import PanelContainer from "@components/mine/PanelContainer/PanelContainer";
import AppMain from "@/layout/components/AppMain";

export default {
  name: 'Layout',
  components: {
    AppMain,
    PanelContainer
  },
  data() {
    return {
      title: '',
      subTitle: '',
      hiddenRight: false
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.title = this.$route.meta.title
        this.subTitle = this.$route.meta.subTitle || ''
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
.main-box{
  flex: 1 1 100%;
  overflow: auto;
  padding-left: 40px;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.my-container{
  display: flex;
  padding-top: 30px;
  padding-bottom: 200px;
}

.panel-title {
  line-height: 33px;
  font-size: 28px;
  color: #333333;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  p {
    color: #333333;
    line-height: 22px;
    font-size: 16px;
    margin-top: 10px;
    font-weight: normal;
  }
}

</style>
