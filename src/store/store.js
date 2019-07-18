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
      sessionStorage.auth=data.auth
      let baseMenu=[
        {
          name: "运行监控",
          name_en: "Test Running",
          router: "/running",
          icon: "el-icon-picture-outline",
          children: []
        },
        {
          name: "测试执行",
          name_en: "Test Config",
          router: "/",
          icon: "el-icon-time",
          children: [
            {
              name: "出厂测试",
              name_en: "All Test",
              router: "/all",
              icon: "el-icon-date"
            },
            {
              name: "军检测试",
              name_en: "Standard Test",
              router: "/standard",
              icon: "el-icon-document"
            },
            {
              name: "自定义测试",
              name_en: "User Defined Test",
              router: "/defined",
              icon: "el-icon-document"
            }
          ]
        },
        {
          name: "结果查询",
          name_en: "Result Query",
          router: "/result",
          icon: "el-icon-search",
          children: []
        }
        ]
      console.log(baseMenu)
      if (sessionStorage.auth < 2) {
        let addMenu= {
          name: "测试配置",
          name_en: "Test Configuration",
          router: "/config",
          icon: "el-icon-setting",
          children: [
            {
              name: "产品配置",
              name_en: "Product Config",
              router: "/product",
              icon: "el-icon-edit"
            }
          ]
        }
        if(sessionStorage.auth< 1) {
          addMenu.children.push(
            {
              name: "转台温箱",
              name_en: "Wxzt Config",
              router: "/wxzt",
              icon: "el-icon-edit"
            },
            {
              name: "板卡配置",
              name_en: "Board Config",
              router: "/board",
              icon: "el-icon-edit"
            }
          )
        }
        baseMenu.push(addMenu)

      }
      sessionStorage.menu=JSON.stringify(baseMenu)
      console.log(sessionStorage.menu)
      //sessionStorage.token = data.token

    },
    [types.LOGOUT]:(state) => {
      sessionStorage.clear()
      sessionStorage.removeItem('token')
      state.token=null
    },
  }
})
