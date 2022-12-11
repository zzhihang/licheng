import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
import ParentView from "@components/ParentView";

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
        component: () => import('@/views/home'),
        name: 'Index',
        meta: {title: '首页', icon: 'dashboard', affix: true}
      },
    ]
  },
]
// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/transaction',
    component: Layout,
    meta: {title: '交易中心'},
    redirect: '/transaction/bidding',
    children: [{
      path: '/transaction/bidding',
      component: () => import('@/views/transaction/bidding'),
      meta: {title: '竞价交易'}
    }, {
      path: '/transaction/listing',
      component: () => import('@/views/transaction/listing'),
      meta: {title: '挂牌交易'}
    }, {
      path: '/transaction/mall',
      component: () => import('@/views/transaction/mall'),
      meta: {title: '线上商城'}
    }]
  },
  {
    path: '/news',
    component: Layout,
    meta: {title: '资讯中心'},
    redirect: '/news/policy',
    children: [{
      path: '/news/policy',
      component: () => import('@/views/news/index'),
      meta: {title: '政策文件'}
    }, {
      path: '/news/industry',
      component: () => import('@/views/news/index'),
      meta: {title: '行业新闻'}
    }, {
      path: '/news/study',
      component: () => import('@/views/news/index'),
      meta: {title: '综合研究'}
    }]
  },
  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/goods-find-car',
    meta: {title: '物流服务', icon: 'dashboard', affix: true},
    children: [{
      path: '/logistics/goods-find-car',
      component: () => import('@/views/logistics'),
      meta: {title: '货找车'}
    }, {
      path: '/logistics/car-find-goods',
      component: () => import('@/views/logistics'),
      meta: {title: '车找货'}
    }]
  },
  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/goods-find-warehouse',
    meta: {title: '仓储服务'},
    children: [{
      path: '/storage/goods-find-warehouse',
      component: () => import('@/views/storage'),
      meta: {title: '货找仓'}
    }, {
      path: '/storage/warehouse-find-goods',
      component: () => import('@/views/storage'),
      meta: {title: '仓找货'}
    }, {
      path: '/storage/goods-find-warehouse/:id',
      component: () => import('@/views/storage/detail'),
      meta: {title: '查看货找仓'},
      hidden: true,
    }, {
      path: '/storage/warehouse-find-goods/:id',
      component: () => import('@/views/storage/detail'),
      meta: {title: '查看仓找货'},
      hidden: true,
    }]
  },
  {
    path: '/center',
    component: Layout,
    name: 'User',
    redirect: '/center/user/index',
    meta: {title: '用户中心'},
    children: [
      {
        path: '/center/user/index',
        component: ParentView,
        name: 'CenterUser',
        meta: {title: '用户管理'},
        children: [{
          path: '/center/user/index',
          component: () => import('@/views/center/user/index'),
          meta: {title: '企业认证'},
          hidden: true
        },{
          path: '/center/user/enterprise',
          component: () => import('@/views/center/user/enterprise'),
          meta: {title: '企业认证', subTitle: '企业填写真实资料进行认证'}
        },{
          path: '/center/user/enterprise-auth',
          component: () => import('@/views/center/user/enterprise-auth'),
          meta: {title: '企业认证'},
          hidden: true
        },{
          path: '/center/user/enterprise-operate',
          component: () => import('@/views/center/user/enterprise-operate'),
          name: 'CenterNewsAdd',
          meta: {title: '营运资料认证'}
        },{
          path: '/center/user/enterprise-audit',
          component: () => import('@/views/center/user/enterprise-audit'),
          meta: {title: '企业认证审核'}
        },{
          path: '/center/user/enterprise-manage',
          component: () => import('@/views/center/user/enterprise-manage'),
          meta: {title: '企业管理列表'}
        },{
          path: '/center/user/enterprise/:id',
          component: () => import('@/views/center/user/enterprise-detail'),
          meta: {title: '查看认证资料'},
          hidden: true
        },{
          path: '/center/user/enterprise-operate/:id',
          component: () => import('@/views/center/user/enterprise-operate-detail'),
          meta: {title: '查看营运资料'},
          hidden: true
        },{
          path: '/center/user/userinfo-manage',
          component: () => import('@/views/center/user/userinfo-manage'),
          meta: {title: '用户资料管理'}
        }]
      },
      {
        path: '/center/news',
        component: ParentView,
        name: 'CenterNews',
        meta: {title: '资讯管理'},
        redirect: '/center/news',
        children: [{
          path: '/center/news',
          component: () => import('@/views/center/news/index'),
          meta: {title: '资讯管理'}
        },{
          path: '/center/news/add',
          component: () => import('@/views/center/news/add'),
          name: 'CenterNewsAdd',
          hidden: true,
          meta: {title: '发布资讯'}
        },{
          path: '/center/news/:id',
          component: () => import('@/views/center/news/detail'),
          hidden: true,
          meta: {title: '资讯详情'}
        },]
      },
      {
        path: '/center/bidding',
        component: ParentView,
        name: 'CenterBidding',
        meta: {title: '竞价交易管理'},
        children: [{
          path: '/center/bidding',
          component: () => import('@/views/center/bidding/index'),
          meta: {title: '我发布的竞价交易'},
        },{
          path: '/center/bidding-join',
          component: () => import('@/views/center/bidding/join'),
          meta: {title: '我参与的竞价交易'},
        },{
          path: '/center/bidding-company-manage',
          component: () => import('@/views/center/bidding/bidding-company-manage'),
          meta: {title: '竞价企业维护'},
        },{
          path: '/center/bidding/add',
          component: () => import('@/views/center/bidding/add'),
          meta: {title: '发布'},
          hidden: true
        },{
          path: '/center/bidding/record/:id',
          component: () => import('@/views/center/bidding/record'),
          meta: {title: '出价记录'},
          hidden: true
        }]
      },
      {
        path: '/center/listing',
        component: ParentView,
        name: 'CenterListing',
        meta: {title: '挂牌交易管理'},
        children: [{
          path: '/center/listing',
          component: () => import('@/views/center/listing/index'),
          meta: {title: '我发布的挂牌交易'},
        },{
          path: '/center/listing-join',
          component: () => import('@/views/center/listing/join'),
          meta: {title: '我参与的挂牌交易'},
        },{
          path: '/center/listing/add',
          component: () => import('@/views/center/listing/add'),
          meta: {title: '发布'},
          hidden: true
        },{
          path: '/center/listing/detail/:id',
          component: () => import('@/views/center/listing/detail'),
          meta: {title: '挂牌信息'},
          hidden: true
        }]
      }, {
        path: '/center/logistics',
        component: ParentView,
        name: 'CenterLogistics',
        redirect: '/center/logistics/publish',
        meta: {title: '物流服务管理', icon: 'dashboard', affix: true},
        children: [{
          path: '/center/logistics/publish',
          component: () => import('@/views/center/logistics/index'),
          name: 'CenterLogisticsPublish',
          meta: {title: '我的发布', icon: 'dashboard', affix: true},
        }, {
          path: '/center/logistics/publish/goods-find-car',
          component: () => import('@/views/center/logistics/publish/goods-find-car'),
          meta: {title: '发布货找车资讯'},
          hidden: true
        }, {
          path: '/center/logistics/publish/car-find-goods',
          component: () => import('@/views/center/logistics/publish/car-find-goods'),
          meta: {title: '发布车找货资讯'},
          hidden: true
        }, {
          path: '/center/logistics/collect',
          component: () => import('@/views/center/logistics/collect'),
          meta: {title: '我的收藏', icon: 'dashboard', affix: true}
        },{
          path: '/center/logistics/:id',
          title: '资讯详情',
          component: () => import('@/views/center/logistics/detail'),
          meta: {title: '资讯详情'},
          hidden: true
        }]
      },
      {
        path: '/center/product',
        component: ParentView,
        name: 'CenterProduct',
        meta: {title: '商品管理'},
        redirect: '/center/product',
        children: [{
          path: '/center/product',
          title: '商品品类管理',
          component: () => import('@/views/center/product/index'),
          meta: {title: '商品品类管理'},
        }]
      },
      {
        path: '/center/storage',
        component: ParentView,
        name: 'CenterStorage',
        meta: {title: '仓储服务管理'},
        redirect: '/center/storage/publish',
        children: [{
          path: '/center/storage/publish',
          title: '我发布的仓储资讯',
          component: () => import('@/views/center/storage/index'),
          meta: {title: '我的发布'},
        }, {
          path: '/center/storage/publish/goods-find-warehouse',
          component: () => import('@/views/center/storage/publish/goods-find-warehouse'),
          meta: {title: '发布货找仓资讯'},
          hidden: true
        }, {
          path: '/center/storage/publish/warehouse-find-goods',
          component: () => import('@/views/center/storage/publish/warehouse-find-goods'),
          meta: {title: '发布仓找货资讯'},
          hidden: true
        }, {
          path: '/center/storage/collect',
          title: '我收藏的仓储资讯',
          component: () => import('@/views/center/storage/collect'),
          meta: {title: '我的收藏'},
        },{
          path: '/center/storage/:id',
          title: '资讯详情',
          component: () => import('@/views/center/storage/detail'),
          meta: {title: '资讯详情'},
          hidden: true
        }]
      },
      {
        path: '/center/transaction',
        component: ParentView,
        name: 'CenterTransaction',
        meta: {title: '交易查询'},
        children: [{
          path: '/center/transaction/bidding',
          title: '竞价交易',
          component: () => import('@/views/center/transaction/bidding'),
          meta: {title: '竞价交易', subTitle: '查看全部的竞价交易'},
        },{
          path: '/center/transaction/listing',
          title: '挂牌交易',
          component: () => import('@/views/center/transaction/listing'),
          meta: {title: '挂牌交易', subTitle: '查看全部的挂牌交易'},
        }]
      },
    ]
  },
  {
    path: '/supply',
    component: () => import('@/views/supply'),
    name: 'Supply',
    meta: {title: '供应链服务'}
  },
  {
    path: '/logistics/:id',
    component: () => import('@/views/logistics/detail'),
    meta: {title: '查看车找货'},
    hidden: true,
  },
  {
    path: '/news/:id',
    component: () => import('@/views/news/detail'),
    meta: {title: '资讯详情'},
    hidden: true
  },
  {
    path: '/transaction/listing/:id',
    component: () => import('@/views/transaction/listing-detail'),
    meta: {title: '挂牌商品详情'}
  },
  {
    path: '/storage/:id',
    component: () => import('@/views/storage/detail'),
    meta: {title: '资讯详情'},
    hidden: true
  },
  {
    path: '/transaction/bidding/detail',
    component: () => import('@/views/transaction/bidding-detail'),
    meta: {title: '竞价商品详情'},
    hidden: true
  },

]
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes.concat(dynamicRoutes)
})
