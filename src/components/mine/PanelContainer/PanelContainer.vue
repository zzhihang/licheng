<template>
  <div class="my-menu" :class="{'center': isMenuCenter}" v-if="menus.length">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#165DFF">
      <template>
        <div class="parent-menu">交易中心</div>
      </template>
      <template v-for="(item, index) in menus">
        <el-submenu :key="index"
                    :index="String(index)"
                    :class="{'none-menu': !item.children}"
        >
          <template slot="title" v-if="!item.hidden">
            <router-link :to="item.path">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </template>
          <el-menu-item-group v-if="item.children">
            <template v-for="(child, childIndex) in item.children">
              <router-link :to="child.path" v-if="!child.hidden">
                <el-menu-item :key="childIndex"
                              :index="index + '-' + childIndex"
                              style="padding-left: 60px;"
                >
                  {{ child.title || child.meta.title }}
                </el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {constantRoutes} from '@/router'
import {getAppList} from "@/api/common";

export default {
  components: {},
  data() {
    return {
      menus: [],
      isMenuCenter: false //左侧菜单样式是否居中显示
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    $route: {
      handler(val) {
        const {fullPath} = this.$route
        const finderPath = '/' + fullPath.split('/')[1]
        const finder = constantRoutes.find(item => item.path === '/').children
        this.menus = finder.find(item => item.path === finderPath).children || [];
        this.menus = this.menus.filter(item => !item.hidden)
        if(!fullPath.startsWith('/center')){
          this.isMenuCenter = true;
        }else{
          this.isMenuCenter = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.my-menu {
  .el-menu {
    background: #FFFFFF;
    box-shadow: 0 0 8px 1px #E9EBED;
    border-radius: 8px;
    width: 246px;
    flex-shrink: 0;
  }

  .right-panel {
    flex: 1;
    padding-left: 40px;
    overflow: hidden;
  }

  &.center{
    .parent-menu{
      text-align: center;
      padding-left: 0;
    }
  }

  .parent-menu{
    height: 56px;
    color: #333333;;
    font-size: 16px;
    line-height: 56px;
    border-bottom: 1px solid #EDEFF5;;
    padding-left: 60px;
    font-weight: bold;
  }

  //.el-menu-item-group ul a {
  //  &:last-child{
  //    .el-menu-item{
  //      border-bottom: none;
  //    }
  //  }
  //}

  .el-submenu {

    .el-menu-item {
      border-bottom: 1px solid #EDEFF5;

      //&:last-child {
      //  border-bottom: none;
      //}
      &.is-active:before{
        background: #165DFF;
      }

      &:before {
        content: '';
        width: 6px;
        height: 6px;
        display: inline-block;
        margin-right: 12px;
        background: #666666;
        border-radius: 100%;
      }
    }
  }
  .none-menu{
    ::v-deep .el-submenu__icon-arrow{
      display: none;
    }
  }

  ::v-deep .el-menu-item-group__title{
    display: none;
  }
}
</style>
