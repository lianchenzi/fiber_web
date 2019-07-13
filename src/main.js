// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // 必须在最开始引入垫片
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/http'
import store from './store/store'
import VueParticles from 'vue-particles'
import i18n from './lang'
import VueSocketIO from 'vue-socket.io'

import * as utils from '@/utils'
import 'font-awesome/scss/font-awesome.scss'
// 在入口处引入模拟的假数据
//import '@/mock'
// 引入完整的饿了么组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/element-variables.scss'
import * as types from "./store/types";
Vue.use(ElementUI);
// 使用登录页粒子效果插件
Vue.use(VueParticles)
// 将axios绑定到vue原型上
Vue.prototype.$axios = axios
// Vue 的全局配置
Vue.config.productionTip = false
// 上线全局请求配置
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:5000/test',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
    el: '#app',
    i18n,
    router,
    axios,
    store,
    template: '<App/>',
    components: { App }
})
