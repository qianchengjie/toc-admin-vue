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
  { path: '', component: Layout, redirect: '/login' },
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        component: _import('index/Index'),
        name: 'index',
        meta: { title: 'index', icon: 'home' }
      }
    ]
  }
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }]
  // }
]

export const asyncRouterMap = [
  {
    path: '/userManagement',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'userManagement', icon: 'component', roles: ['superAdmin'] },
    children: [
      {
        path: 'userList',
        component: _import('user-management/UserList'),
        name: 'userList',
        meta: { title: 'userList', icon: 'list', roles: ['superAdmin'] }
      }
      // {
      //   path: 'permission',
      //   component: _import('user-management/Permission'),
      //   name: 'permission',
      //   meta: { title: 'permission', icon: 'permission', roles: ['superAdmin'] }
      // }
    ]
  },
  {
    path: '/topicManagement',
    component: Layout,
    meta: { title: 'topicManagement', icon: 'component', roles: ['admin', 'superAdmin'] },
    children: [
      {
        path: 'topicList',
        component: _import('topic-management/TopicList'),
        name: 'topicList',
        meta: { title: 'topicList', icon: 'list', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'topic',
        component: _import('topic-management/Topic'),
        name: 'topic',
        hidden: true,
        meta: { title: 'topic', hiddenTag: true, roles: ['admin', 'superAdmin'], noCache: true }
      },
      {
        path: 'reviewList',
        component: _import('topic-management/ReviewList'),
        name: 'reviewList',
        meta: { title: 'reviewList', icon: 'list', roles: ['admin', 'superAdmin'] }
      }
    ]
  }
]

export default new Router({
  // mode: 'history'
  // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
