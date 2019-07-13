import axios from "axios";
import store from "../store/store";
import * as types from "../store/types";
import router from "../router";
//import Vue from "vue/types/vue";
// 将axios绑定到vue原型上
//Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:5000/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 如果本地存储中有token字段， 就为所有请求加上Authorization请求头
    if (store.state.token) {
      config.headers["Authorization"] = `Bearer ${store.state.token}`
    }
    return config;
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 如果后端返回没有权限
        case 401:
          // 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace("/login");
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });
export default axios;
