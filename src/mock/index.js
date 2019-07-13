import Mock from "mockjs";
let debug = 1;
if (debug) {
  Mock.mock(/login/, {
    data: {
      data: {
        userId: "@integer(1,10)",
        "userName|1": ["测试员A", "管理员", "军代表", "项目经理", "测试员B"],
        token: "@string(30)"
      },
      code:200,
      message:''
    },
    msg: "Success",
    status: "YQ-000"
  });
  Mock.mock(/setupTest/, {
    data: {
      data: '',
      code:200,
      message:''
    },
    msg: "Success",
    status: "YQ-000"
  });
  Mock.mock(/getMenu/, {
    data: {
      menu: [
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
      ]
    },
    msg: "Success",
    status: "YQ-000"
  });
}
