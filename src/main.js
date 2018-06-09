// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import * as filters from './filters' // global filters
import i18n from './lang' // Internationalization
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data
import './icons' // icon

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'

import '@/styles/index.scss' // global css

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
