<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
    <div id="sidebar-wrap" :class="{ collapsed: toggSiderBar }">
        <h3 class="logo">
          <span class="rythm twist1">{{toggSiderBar ? 'TEST':'陀螺测试'}}</span>
        </h3>
        <el-menu background-color="#3f4d67" text-color="#fff" :default-active="$route.path" :unique-opened="true" :router="true" mode="vertical" :collapse="toggSiderBar">
            <template v-for="item in menu">
                <el-submenu v-if="item.children.length !== 0" :index="item.router" :key="item.router">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">
                        <!-- <i :class="child.icon"></i> -->
                        <span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="item.router" :key="item.router">
                    <i :class="item.icon"></i>
                    <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
                </el-menu-item>

            </template>
            <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-time"></i>
                        <span slot="title">项目管理</span>
                    </template>
                    <el-menu-item index="/project-info">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目信息</span>
                    </el-menu-item>
                    <el-menu-item index="/project-path">
                        <i class="el-icon-share"></i>
                        <span slot="title">项目路径</span>
                    </el-menu-item>
                    <el-menu-item index="/enroll-list">
                        <i class="el-icon-document"></i>
                        <span slot="title">报名列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/operation-log">
                    <i class="el-icon-date"></i>
                    <span slot="title">操作日志</span>
                </el-menu-item> -->
        </el-menu>
        <div class="animated bounceInDown imgWrap">
            <img src="../../static/img/little.gif" height="60px" class="gif rythm pulse3" >
        </div>
    </div>
</template>
<script>
//import Rythm from "rythm.js";
//const rythm = new Rythm();
//const music = require("../../static/audio/romeostune.mp3");
//import bus from "@/bus";

export default {
  name: "sidebar",
  data() {
    return {
      //isMusicOn: false,
      menu: sessionStorage.menu ? JSON.parse(sessionStorage.menu) : []
      /*menu: [
        {
          name: "测试运行",
          name_en: "Test Running",
          router: "/running",
          icon: "el-icon-picture-outline",
          children: []
        },
        {
          name: "测试配置",
          name_en: "Test Config",
          router: "/",
          icon: "el-icon-time",
          children: [
            {
              name: "全部测试",
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
          icon: "el-icon-menu",
          children: []
        },
        {
          name: "权限管理",
          name_en: "Authority",
          router: "/authority",
          icon: "el-icon-setting",
          children: []
        }
      ]*/
    };
  },
  computed: {
    toggSiderBar() {
      return this.$store.state.isCollapse;
    },
    langType() {
      return this.$i18n.locale;
    }
  },
  created() {
   /* this.initRythm();
    bus.$on("stopMusic", () => {
      this.isMusicOn = false;
      rythm.stop();
    });*/
  },
  methods: {
    /*initRythm() {
      rythm.setMusic(music);
      rythm.addRythm("twist1", "twist", 0, 10);
      rythm.addRythm("pulse3", "pulse", 0, 10, {
        min: 0.75,
        max: 1.5
      });
    },
    toggleDance() {
      if (this.isMusicOn) {
        this.isMusicOn = false;
        rythm.stop();
      } else {
        this.isMusicOn = true;
        rythm.start();
      }
    }*/
  }
};
</script>
<style scoped lang="scss">
#sidebar-wrap {
  width: 160px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  transition: all .5s;
  background: #3f4d67;
  &.collapsed {
    width: 64px;
    transition: all 0.5s;
  }

  /* 图标动画 */
  .imgWrap {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
    .gif {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    color: #fff;
    text-align: center;
    padding: 18px 0;
    margin: 0;
    height: 60px;
    box-sizing: border-box;
  }
}

.el-menu {
  height: 100%;
}

// 美化左侧导航的留白
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 53px !important;
}

// 改变元素属性，要不动画效果不管用，是不是很厉害啊？哈哈哈
.rythm.twist1 {
  display: block;
}

</style>
