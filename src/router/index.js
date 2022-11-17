import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name:'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        name:'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: '/news',
        component: () => import('@/views/news'),
        name: 'News',
        meta: { title: '资讯中心', icon: 'dashboard', affix: true }
      },
      {
        path: '/center',
        component: () => import('@/views/center'),
        name: 'User',
        redirect: '/center/user',
        meta: { title: '用户中心', icon: 'dashboard', affix: true },
        children: [
          {
            path: '/center/user',
            component: () => import('@/views/center/user/index.vue'),
            name: 'CenterUser',
            meta: { title: '用户管理', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/news',
            component: () => import('@/views/center/news/index.vue'),
            name: 'CenterNews',
            meta: { title: '资讯中心', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/news/add',
            component: () => import('@/views/center/news/add.vue'),
            name: 'CenterNewsAdd',
            meta: { title: '发布资讯', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/bidding',
            component: () => import('@/views/center/bidding/index.vue'),
            name: 'CenterBidding',
            meta: { title: '竞价交易管理', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/listing',
            component: () => import('@/views/center/listing/index.vue'),
            name: 'CenterListing',
            meta: { title: '挂牌交易管理', icon: 'dashboard', affix: true }
          },{
            path: '/center/logistics',
            component: () => import('@/views/center/logistics/index.vue'),
            name: 'CenterLogistics',
            redirect: '/center/logistics/publish',
            meta: { title: '物流服务管理', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/logistics/publish',
            component: () => import('@/views/center/logistics/index.vue'),
            name: 'CenterLogisticsPublish',
            meta: { title: '我的发布', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/logistics/publish/goods-find-car',
            component: () => import('@/views/center/logistics/publish/goods-find-car.vue'),
            meta: { title: '发布货找车资讯', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/logistics/publish/car-find-goods',
            component: () => import('@/views/center/logistics/publish/car-find-goods.vue'),
            meta: { title: '发布车找货资讯', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/product',
            component: () => import('@/views/center/product/index.vue'),
            name: 'CenterProduct',
            meta: { title: '商品管理', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/storage',
            component: () => import('@/views/center/storage/index.vue'),
            name: 'CenterStorage',
            meta: { title: '仓储服务管理', icon: 'dashboard', affix: true }
          },
          {
            path: '/center/transaction',
            component: () => import('@/views/center/transaction/index.vue'),
            name: 'CenterTransaction',
            meta: { title: '交易查询', icon: 'dashboard', affix: true }
          },
        ]
      },
    ]
  },
  // {
  //   path: '/notice',
  //   component: () => import('@/views/notice/index'),
  //   name:'Notice',
  //   meta: { title: '通知公告', icon: 'dashboard', affix: true }
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]
// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit','system:user:auth'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit','system:role:auth'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
