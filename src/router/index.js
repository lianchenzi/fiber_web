import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import * as types from '../store/types'

// 登录
const login = resolve => require(["@/views/Signin"], resolve);

// 非登录页的包裹组件
const Layout = resolve => require(["@/views/Layout"], resolve);

// 测试运行
const Running = resolve => require(["@/views/Running"], resolve);

//测试配置
const Config = resolve => require(["@/views/Config"], resolve);

// 军检测试
const Standard = resolve => require(["@/views/Standard"], resolve);

// 自定义测试
const Defined = resolve => require(["@/views/Defined"], resolve);

// 结果查询
const Result = resolve => require(["@/views/Result"], resolve);
// 权限测试
const AuthorityTest = resolve => require(["@/views/AuthorityTest"], resolve);
// 404
const Notfound = resolve => require(["@/views/Notfound"], resolve);

//产品配置
const Product = resolve => require(["@/views/Product"], resolve);

//温箱转台配置
const Wxzt = resolve => require(["@/views/Wxzt"], resolve);

//板卡配置
const Board = resolve => require(["@/views/Board"], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    // 首先是登录页的路由
    {
      path: "/login",
      name: "Login",
      meta: {
        requireAuth: false,
        authLevel:3,
        title: "Login"
      },
      component: login
    },
    // 然后就是嵌套路由了，也就是登陆后的各个页面
    {
      path: "/",
      meta: {
        requireAuth: true,
        authLevel:2
      },
      component: Layout,
      // redirect: '/notes', // 重定向到第一个子路由，否则只渲染Layout组件，这块儿使用时解除注释
      redirect: "/login", // 这里重定向到登录页面，是为了展示使用，实际用这个项目开发时，需要注释这行，解除上一行的注释
      children: [
        {
          path: "all",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "全部测试"
          },
          component: Config
        },
        {
          path: "standard",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "军检测试"
          },
          component: Standard
        },
        {
          path: "defined",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "自定义测试"
          },
          component: Defined
        },
        {
          path: "running",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "测试运行"
          },
          component: Running
        },
        {
          path: "result",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "结果查询"
          },
          component: Result
        },
        {
          path: "authority",
          meta: {
            requireAuth: true,
            authLevel:2,
            title: "权限管理"
          },
          component: AuthorityTest
        },
        {
          path: "product",
          meta: {
            requireAuth: true,
            authLevel:1,
            title: "产品配置"
          },
          component: Product
        }
        ,
        {
          path: "wxzt",
          meta: {
            requireAuth: true,
            authLevel:0,
            title: "温箱转台"
          },
          component: Wxzt
        },
        {
          path: "board",
          meta: {
            requireAuth: true,
            authLevel:0,
            title: "板卡配置"
          },
          component: Board
        }
      ]
    },
    // 最后是404页面
    {
      path: "*",
      meta: {
        requireAuth: false,
        title: "404"
      },
      component: Notfound
    }
  ]
});

// 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log('beforeEach获取当前的token是否存在  '+store.state.token)
    if (store.state.token && sessionStorage.auth) {  // 通过vuex state获取当前的token是否存在
      if (sessionStorage.auth<=to.meta.authLevel) {
        next();
      } else {
        next({
          path: '/running',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }

    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
export default router;
