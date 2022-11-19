<template>
  <div class="panel-container w">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#165DFF">
      <template v-for="(item, index) in menus">
        <router-link :to="item.path">
          <el-submenu :key="index"
                      :index="index"
          >
            <template slot="title" v-if="!item.hidden">
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group v-if="item.children">
              <template v-for="(child, childIndex) in item.children">
                <router-link :to="child.path">
                  <el-menu-item :key="childIndex"
                                :index="index + '-' + childIndex"
                                style="padding-left: 60px;"
                  >
                    {{ child.name }}
                  </el-menu-item>
                </router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </router-link>
      </template>
    </el-menu>
    <div class="right-panel">
      <h1 class="panel-title">
        <span>{{ title }}</span>
        <el-button @click="$router.go(-1)">返回<i class="el-icon-back"></i></el-button>
      </h1>
      <router-view style="margin-top: 27px;">
        <slot></slot>
      </router-view>
    </div>
  </div>
</template>

<script>
import {constantRoutes} from '@/router'

export default {
  components: {},
  props: {
    menus: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      title: '',
      menus: []
    }
  },
  created() {
    this.title = this.$route.meta.title
    const {fullPath} = this.$route
    const finderPath = '/' + fullPath.split('/')[1]
    const finder = constantRoutes.find(item => item.path === '/').children
    this.menus = finder.find(item => item.path === finderPath).children || [];
    console.log(this.menus)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  padding-top: 30px;
  padding-bottom: 240px;

  .el-menu {
    background: #FFFFFF;
    box-shadow: 0 0 8px 1px #E9EBED;
    border-radius: 8px;
    width: 246px;
    flex-shrink: 0;

    ::v-deep .el-menu-item {
      padding-left: 60px;
    }
  }

  .right-panel {
    flex: 1;
    padding-left: 40px;
    overflow: hidden;
  }

  .panel-title {
    line-height: 33px;
    font-size: 28px;
    color: #333333;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
}
</style>
