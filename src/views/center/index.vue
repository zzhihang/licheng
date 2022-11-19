<template>
  <div style="background: #FFFFFF">
    <div class="user-center w">
      <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
        background-color="#fff"
        text-color="#333333"
        active-text-color="#165DFF">
        <el-submenu v-for="(item, index) in menus"
                    :key="index"
                    :index="index"
        >
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-if="item.children">
            <template v-for="(child, childIndex) in item.children">
              <router-link :to="child.path">
                <el-menu-item :key="childIndex"
                              :index="index + '-' + childIndex"
                              style="padding-left: 60px;"
                >
                  {{child.name}}
                </el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="right-panel">
        <h1 class="panel-title">
          <span>{{title}}</span>
          <el-button @click="$router.go(-1)">返回<i class="el-icon-back"></i></el-button>
        </h1>
        <router-view style="margin-top: 27px;"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  components: {

  },
  data() {
    return {
      title: '',
      menus: [{
        name: '用户管理',
        path: '/center/user',
        children: [{

        }]
      },{
        name: '挂牌交易管理',
        path: '/center/listing'
      },{
        name: '竞价交易管理',
        path: '/center/bidding'
      },{
        name: '物流服务管理',
        path: '/center/logistics',
        children: [{
          name: '我发布的物流资讯',
          path: '/center/logistics/publish',
        },{
          name: '我收藏的物流资讯',
          path: '/center/logistics/collect',
        }]
      },{
        name: '仓储服务管理',
        path: '/center/storage'
      },{
        name: '资讯管理',
        path: '/center/news',
        children: [{
          name: '咨询管理',
          path: '/center/news',
        }]
      },{
        name: '商品管理',
        path: '/center/product'
      },{
        name: '交易查询',
        path: '/center/transaction'
      }]
    }
  },
  created() {
    this.title = this.$route.meta.title
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
  .user-center{
    display: flex;
    padding-top: 30px;
    .el-menu{
      background: #FFFFFF;
      box-shadow: 0 0 8px 1px #E9EBED;
      border-radius: 8px;
      width: 246px;
      flex-shrink: 0;
      ::v-deep .el-menu-item{
        padding-left: 60px;
      }
    }

    .right-panel{
      flex: 1;
      padding-left: 40px;
      overflow: hidden;
    }

    .panel-title{
      line-height: 33px;
      font-size: 28px;
      color: #333333;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
