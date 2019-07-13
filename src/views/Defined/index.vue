<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>全局测试配置</span>
      </div>
      <el-form ref="form1" :model="form1" label-width="100px">
        <el-form-item label="产品选择:">
          <el-select v-model="form1.product" placeholder="请选择产品">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-col v-for="(item,index) in 16" :span="5">
          <el-form-item :label=generate(index) :prop="'objects.' + index" :rules=dataRules>
            <el-input size="medium" v-model="form1.objects[index]" placeholder="表号" ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>测试项配置</span>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="常温测试">
          <el-form ref="form" :model="formNormal" label-width="120px" >
            <el-form-item label="测试时长：">
              <el-input-number v-model="formNormal.duration" size="small" :min="10" :max="90"></el-input-number>分钟
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <!--el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalLpVisible = true">高级设置</el-button-->
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                      <el-checkbox label="lp_wdx"  >零偏稳定性</el-checkbox>
                      <el-checkbox label="lp_cfx" >零偏重复性</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="box-card">
      <div style="text-align:center;">
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="submitForm()">提交测试</el-button>
      </div>
    </el-card>
    <el-dialog title="零偏测试设置（常温）" custom-class="customWidth" :visible.sync="dlgNormalLpVisible" :append-to-body="true">
      <el-form :model="formNmLp" label-width="200px" >零偏：
        <el-form-item label="测试时间：">
          <el-input-number v-model="formNmLp.duration" size="small" :min="45" :max="120"></el-input-number> 分钟
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp.wait" size="small" :min="30" :max="90"></el-input-number> 分钟
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formNmLp.samples" size="small" :min="25" :max="40"></el-input-number> * 100
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formNmLp.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
        零偏重复性：
        <el-form-item label="重复次数：">
          <el-input-number v-model="formNmLp.repeat" size="small" :min="2" :max="8"></el-input-number>
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp.waitCfx" size="small" :min="15" :max="90"></el-input-number> 分钟
        </el-form-item>
        <el-form-item label="测试时长：">
          <el-input-number v-model="formNmLp.durationCfx" size="small" :min="5" :max="90"></el-input-number> 分钟
        </el-form-item>
        <el-form-item label="下电时长：">
          <el-input-number v-model="formNmLp.powerDown" size="small" :min="5" :max="90"></el-input-number> 分钟
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgNormalLpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgNormalLpVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {setupTest} from '@/api/api';
  export default {
    name: "defined",
    data() {
      var checkData=(rule, value, callback) =>{
        if (value) {
          if (/[\u4E00-\u9FA5]/g.test(value)) {
            callback(new Error('表号不能出现汉字!'));
          } else {
            callback();
          }
        }
        callback();
      };
      return {
        dlgNormalLpVisible: false,
        dlgLowLpVisible: false,
        dlgHighLpVisible: false,
        dlgNormalBdysVisible: false,
        dlgLowBdysVisible:false,
        dlgHighBdysVisible:false,
        notes: [
          "Coming soon!"
        ],
        dataRules:[
          { validator: checkData, trigger: 'blur'}
        ],
        options: [{
          value: '10FA',
          label: '10FA'
        }, {
          value: 'A1B2C3',
          label: 'A1B2C3'
        }],
        form1: {
          product: '10FA',
          objects:[]
        },
        formNormal: {
          num1: 25,
          duration: 60,
          testItemLp: ['lp','lp_wdx','lp_cfx']
        },
        formNmLp: {
          duration: 60,
          wait:45,
          frequency:1,
          samples:36,
          stableFactor:2,
          repeat:6,
          waitCfx: 60,
          durationCfx:60,
          powerDown:60
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      generate(index) {
        return "表号" + (index+1) + ":"
      },
      submitForm() {
        //console.log(this.formBasic.testItem)
        if (this.form1.objects.length===0){
          alert('至少有一个表号不为空，请输入表号名称');
          return false;
        } else {
          this.$refs['form1'].validate((valid) => {
            if (valid) {
              let config={}
              config["product"]=this.form1.product
              config["ni-dev"]="dev1"
              config["wx"]="rs232"
              config["test-objects"]= {}
              config["objects-list"]=[]
              for(let index in this.form1.objects) {
                config["test-objects"][index]=this.form1.objects[index]
                config["objects-list"].push(this.form1.objects[index])
              };
              config["test-tasks"]={
                "normal":{
                  "temperature":this.formNormal.num1,
                  "testItems":this.formNormal.testItemLp
                }
              }
              config["test-settings"]={
                "normal": {
                  "lp": {
                    "duration": this.formNormal.duration
                  },
                  "lp_cfx": {
                    "duration": this.formNormal.duration
                  }
                }
              }


              //console.log(config);
              setupTest(config).then((res)=>{
                  if(res.data.code===200) {
                    alert('success!');
                    this.$router.push("running" );
                  } else {
                    alert(res.data.message);
                  }
                }
              )
            }
          })
        }
      },
      resetForm() {
        this.form1.objects=[]
      }
    }
  };
</script>
<style scoped lang="scss">
  ol {
    margin-top: 0;
    li {
      line-height: 30px;
    }
  }
  .customWidth {
    hight: 80%;
  }
</style>
