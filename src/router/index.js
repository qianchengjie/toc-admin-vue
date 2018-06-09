import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading,
// because lazy-loading too many pages will cause webpack hot update too slow.
// so only in production use lazy-loading;
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '', component: Layout, redirct: '/login' },
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [{
      path: 'index',
      component: _import('Test'),
      hidden: false,
      meta: {
        title: 'permission',
        icon: 'dashboard',
        roles: ['admin', 'editor'],
        noCache: true
      }
    }]
  },
  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  }
]

export const asyncRouterMap = []

export default new Router({
  // mode: 'history'
  // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
