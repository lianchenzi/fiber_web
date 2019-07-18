<template>
    <div class="bg">
        <div class="login-wrap animated flipInY">
            <h3>Auto Test</h3>
            <h3>{{$t('m.login.introduction')}}</h3>
            <el-form ref="form" :model="form" :rules="rules" label-width="0px">
                <el-form-item prop="name">
                    <el-input :placeholder="$t('m.login.name_holder')" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :placeholder="$t('m.login.password_holder')" v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="space-between">
                        <el-checkbox v-model="isMemery" style="color:#eee">{{$t('m.login.remember')}}</el-checkbox>
                        <a href="" @click.prevent="openMsg"  style="color:#eee">{{$t('m.login.forget')}}</a>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Login('form')">{{$t('m.login.button')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 粒子漂浮物 -->
        <vue-particles
            color="#fff"
            :particleOpacity="0.7"
            :particlesNumber="30"
            shapeType="star"
            :particleSize="5"
            linesColor="#fff"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
    </div>
</template>
<script>
  import store from '../../store/store';
  //import * as types from "@/store/types"
  import {loginType} from '@/api/api';
  import * as types from "../../store/types";
export default {
  name: "signin",
  data() {
    return {
      form: {
        username: localStorage.userInfo || "admin",
        password: localStorage.passwordInfo || "654321"
      },
      token:'',
      isMemery: false,
      rules: {
        username: [
          {
            required: true,
            message: this.$t('m.login.name_tip'),
            trigger: "blur",
            // validator: checkone
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('m.login.password_tip'),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.username==='temp') {
            //留个后门，可以不用连接后端就可以进入
            console.log('temp')
            let tempData={userId:999,username:'temp',auth:4,token:9234343}
            store.commit(types.LOGIN,tempData)
            let redirect=decodeURIComponent(this.$route.query.redirect || '/running')
            this.$router.push({
              path:redirect
            })

          } else{
            loginType(this.form).then((res)=>{
              console.log(res.data.data)
              if(res.data.code===200) {
                console.log(res.data.data)
                this.token=res.data.data.token
                if (this.token) {
                  store.commit(types.LOGIN,res.data.data)
                  let redirect=decodeURIComponent(this.$route.query.redirect || '/running')
                  this.$router.push({
                    path:redirect
                  })
                }
              }else{
                this.$message.error('用户名和密码错误')
              }
            },err =>{
              this.$message.error('internal error')
              console.log(err)
            })
          }

        } else {
          this.$message.error('internal error')
          return false;
        }
      });
    },
    getMenu() {
      this.$axios({
        url: "getMenu",
        method: "GET"
      }).then(res => {
        // 提取菜单数组，交给本地存储
        let menu = res.data.data.menu;
        localStorage.menu = JSON.stringify(menu);
        this.$router.push("running" );
      });
    },
    openMsg() {
      // 注意这里使用了国际化
      this.$message.warning(this.$t('m.login.info'));
    }
  },
  watch: {
    isMemery(n, o) {
      if (n) {
        localStorage.userInfo = this.form.username
        localStorage.passwordInfo = this.form.password
      } else {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('passwordInfo')
      }
    }
  }
};
</script>
<style scoped lang="scss">
.bg {
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../../static/img/sky.jpg');
    background-position: -20% 10%;
    background-size: contain;
    #particles-js {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
.login-wrap {
  width: 330px;
  border-radius: 5px;
  padding: 20px;
  z-index: 3;
  margin-right: -37%;
  background: rgba(216,220,229,0.5);
  .el-form-item {
    margin-bottom: 25px !important;
  }
  h3 {
    text-align: center;
    color: #ebedef;
    margin-top: 0px;
    margin-bottom: 5px;
    span {
        color: #20a0ff;
    }
  }
  form {
    margin-top: 25px;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  a {
    text-decoration: none;
    color: #1f2d3d;
  }
  button {
    width: 100%;
    font-weight: 600;
  }
}
</style>
