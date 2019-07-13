import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isCollapse: false,
    chartTheme: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"],
    token:sessionStorage.getItem('token')
  },
  mutations: {
    [types.TOGGLE]:(state) =>{
      state.isCollapse = !state.isCollapse
    },
    [types.LOGIN]:(state,data) => {
      console.log(data)
      sessionStorage.token=data.token
      state.token=data.token
      sessionStorage.userName = data.username
      sessionStorage.userId = data.userId
      //sessionStorage.token = data.token

    },
    [types.LOGOUT]:(state) => {
      sessionStorage.clear()
      //sessionStorage.removeItem('token')
      state.token=null
    },
  }
})
