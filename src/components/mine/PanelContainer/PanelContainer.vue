<template>
  <div class="my-menu" v-if="menus.length">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#165DFF">
      <template v-for="(item, index) in menus">
        <el-submenu :key="index"
                    :index="String(index)"
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
      menus: []
    }
  },
  created() {

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

  .el-submenu {
    border-bottom: 1px solid #EDEFF5;

    .el-menu-item {
      border-bottom: 1px solid #EDEFF5;

      &:last-child {
        border-bottom: none;
      }

      &:before {
        content: '';
        width: 6px;
        height: 6px;
        display: inline-block;
        margin-right: 12px;
        background: #165DFF;
        border-radius: 100%;
      }
    }
  }
}
</style>
