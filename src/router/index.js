import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/form/index'
    // children: [{
    //   path: 'home',
    //   name: 'Index',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '控制台', icon: 'dashboard' }
    // }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    name: 'nihao',
    path: 'http://ruoyi.vip',
    meta: { title: 'vip', icon: 'guide' },
    component: Layout,
    children: []
  },
  // {
  //   path: '/top',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'DengA',
  //       component: () => import('@/views/top/index'),
  //       meta: { title: 'Deng', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'ExampleA',
    meta: { title: '例子', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Steven',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Meg',
        component: () => import('@/views/tree/index'),
        meta: { title: '树节点', icon: 'tree' }
      },
      {
        path: 'https://www.baidu.com',
        meta: { title: '百度', icon: 'link' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'FormA',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/newlink',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        name: 'link',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  },

  {
    path: '/system',
    name: '测试管理',
    component: Layout,
    alwaysShow: true,
    redirect: '/system/tree',
    meta: {
      title: '测试管理',
      icon: 'example'
    },
    children: [
      {
        path: 'tree',
        name: '树节点',
        component: () => import('@/views/tree/index'),
        meta: { title: '树节点', icon: 'tree' }
      },
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        name: '外连',
        meta: { title: '外连', icon: 'link' }
      }
    ]
  },

  {
    path: '/menu',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '测试菜单',
        component: () => import('@/views/form/index'),
        meta: { title: '测试菜单', icon: 'form' }
      }
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
