import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router, { constantRoutes } from './router'

import Layout from '@/layout'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('user')) {
    alert('go to login')
    next()
  } else {
    const user = store.state.user
    if (!user.navTree && !user.permission) {
      addDynamicMenuAndRoutes()
    }
    next()
  }
})

async function addDynamicMenuAndRoutes() {
  await Promise.all([store.dispatch('user/setNavTree'), store.dispatch('user/setPermission')])
  const dynamicRoutes = addDynamicRoutes(store.state.user.navTree)
  router.options.routes = [...constantRoutes, ...dynamicRoutes]
  router.onReady(() => {
    dynamicRoutes.push({ path: '*', redirect: '/404', hidden: true })
    store.commit('permission/SET_ROUTES', dynamicRoutes) // 动态显示菜单
    router.addRoutes(dynamicRoutes)
  })
}
function addDynamicRoutes(menuList = [], routes = []) {
  menuList.forEach(item => {
    const info = {
      path: '',
      component: Layout,
      children: []
    }
    if (item.level === 0 && item.type === 0 && item.children.length) {
      const url = item.children[0].url
      const baseUrl = url.replace(/\//, '')
      info.path = '/' + baseUrl.substr(0, baseUrl.indexOf('/'))
      info.name = item.name
      info.meta = {
        title: item.name,
        icon: item.icon
      }
      info.redirect = url
      info.alwaysShow = true
      info.component = Layout
      item.children.forEach(menu => {
        const menuUrl = menu.url
        const menuBaseUrl = menuUrl.replace(/\//, '')
        const menuInfo = addTree(menuBaseUrl.substr(menuBaseUrl.indexOf('/') + 1), menu.name, resolve => require([`@/views${menuUrl}`], resolve), menu.icon)
        info.children.push(menuInfo)
      })
    } else if (item.level === 0 && item.type === 1) {
      const url = item.url
      const baseUrl = url.replace(/\//, '')
      info.path = '/' + baseUrl.substr(0, baseUrl.indexOf('/'))
      const menuInfo = addTree(baseUrl.substr(baseUrl.indexOf('/') + 1), item.name, resolve => require([`@/views${url}`], resolve), item.icon)
      info.children.push(menuInfo)
    }
    routes.push(info)
  })
  return routes
}

function addTree(path, name, component, icon) {
  return {
    path,
    name,
    component,
    meta: {
      title: name,
      icon: icon
    }
  }
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
