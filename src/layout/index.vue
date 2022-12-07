<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <top-header></top-header>
    <router-view></router-view>
    <home-footer></home-footer>
    <login-modal/>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView, TopHeader, HomeFooter } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import PanelContainer from "@components/mine/PanelContainer/PanelContainer";
import {constantRoutes} from "@/router";
import LoginModal from "@views/LoginModal";

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TopHeader,
    TagsView,
    HomeFooter,
    PanelContainer,
    LoginModal
  },
  mixins: [ResizeMixin],
  data() {
    return {
      title: '',
      subTitle: '',
      hiddenRight: false,
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  watch: {
    $route: {
      handler(val) {
        if(val.fullPath === '/home'){
          this.hiddenRight = true;
        }else{
          this.hiddenRight = false;
        }
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
