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
        <span> 测试配置</span>
      </div>
      <el-tabs type="border-card">
        <!--el-tab-pane label="基础测试">
          <el-form ref="form" :model="formBasic" label-width="100px">
            <el-form-item label="测试选项：">
              <el-checkbox-group v-model="formBasic.testItem">
                <el-checkbox label="jx"  >极性</el-checkbox>
                <el-checkbox label="lz" >阈值</el-checkbox>
                <el-checkbox label="fbl" >分辨率</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane-->
        <el-tab-pane label="常温测试">
          <el-form ref="form" :model="formNormal" label-width="120px" >
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>&ensp;&ensp;&ensp;
                    <!--el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalLpVisible = true">高级设置</el-button-->
                    <label>运行时间： </label> <el-input-number v-model="formNormal.duration" size="small" :min="30" :max="86400"></el-input-number> 秒

                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                      <br>
                      <el-checkbox label="lp_cfx" >零偏重复性</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标度因素系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalBdysVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <br>
                      <el-checkbox label="bdys"  >标度因素</el-checkbox>
                      <!--el-checkbox label="xxd" >线性度</el-checkbox-->
                      <el-checkbox label="bdys_cfx" >标度因素重复性</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="低温测试">
          <el-form ref="form" :model="formLow" label-width="120px">
            <el-form-item label="温度设置：">
              <el-input-number v-model="formLow.temperature" :min="-65" :max="-40" size="small" ></el-input-number> ℃
            </el-form-item>
            <el-form-item label="保温时间：">
              <el-input-number v-model="formLow.time" :min="0" :max="7200" size="small" ></el-input-number> 秒
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgLowLpVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formLow.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                      <!--el-checkbox label="lp_wdx" >零偏稳定性</el-checkbox-->
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标度因素系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgLowBdysVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formLow.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <el-checkbox label="bdys" >标度因素</el-checkbox>
                      <!--el-checkbox label="xxd" >线性度</el-checkbox-->
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="高温测试">
          <el-form ref="form" :model="formHigh" label-width="120px">
            <el-form-item label="温度设置：">
              <el-input-number v-model="formHigh.temperature" :min="45" :max="65" size="small" ></el-input-number> ℃
            </el-form-item>
            <el-form-item label="保温时间：">
              <el-input-number v-model="formHigh.time" :min="0" :max="7200" size="small" ></el-input-number> 秒
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgHighLpVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formHigh.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                      <!--el-checkbox label="lp_wdx" >零偏稳定性</el-checkbox-->
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标度因素系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgHighBdysVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formHigh.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <el-checkbox label="bdys" >标度因素</el-checkbox>
                      <!--el-checkbox label="xxd" >线性度</el-checkbox-->
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
          <el-input-number v-model="formNmLp.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formNmLp.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formNmLp.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
        零偏重复性：
        <el-form-item label="重复次数：">
          <el-input-number v-model="formNmLp.repeat" size="small" :min="2" :max="8"></el-input-number>
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp.waitCfx" size="small" :min="300" :max="7200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="测试时长：">
          <el-input-number v-model="formNmLp.durationCfx" size="small" :min="300" :max="36000"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="下电时长：">
          <el-input-number v-model="formNmLp.powerDown" size="small" :min="300" :max="18000"></el-input-number> 秒
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgNormalLpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgNormalLpVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="零偏测试设置（低温）" custom-class="customWidth" :visible.sync="dlgLowLpVisible" :append-to-body="true">
      <el-form :model="formLowLp" label-width="200px" >
        <el-form-item label="测试时间：">
          <el-input-number v-model="formLowLp.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formLowLp.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formLowLp.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formLowLp.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgLowLpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgLowLpVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="零偏测试设置（高温）" custom-class="customWidth" :visible.sync="dlgHighLpVisible" :append-to-body="true">
      <el-form :model="formHighLp" label-width="200px" >
        <el-form-item label="测试时间：">
          <el-input-number v-model="formHighLp.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formHighLp.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formHighLp.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formHighLp.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgHighLpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgHighLpVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（常温）" custom-class="customWidth" :visible.sync="dlgNormalBdysVisible" :append-to-body="true">
      <el-form :model="formNmBdys" label-width="200px" >标度因素：
        <el-form-item label="采样周期：">
          <el-input-number v-model="formNmBdys.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formNmBdys.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formNmBdys.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
        标度因素重复性：
        <el-form-item label="重复次数：">
          <el-input-number v-model="formNmBdys.repeat" size="small" :min="2" :max="8"></el-input-number>
        </el-form-item>
        <el-form-item label="下电时长：">
          <el-input-number v-model="formNmBdys.powerDown" size="small" :min="300" :max="18000"></el-input-number> 分钟
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgNormalBdysVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgNormalBdysVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（低温）" custom-class="customWidth" :visible.sync="dlgLowBdysVisible" :append-to-body="true">
      <el-form :model="formLowBdys" label-width="200px" >
        <el-form-item label="采样周期：">
          <el-input-number v-model="formLowBdys.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formLowBdys.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formLowBdys.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgLowBdysVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgLowBdysVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（高温）" custom-class="customWidth" :visible.sync="dlgHighBdysVisible" :append-to-body="true">
      <el-form :model="formHighBdys" label-width="200px" >
        <el-form-item label="采样周期：">
          <el-input-number v-model="formHighBdys.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formHighBdys.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formHighBdys.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgHighBdysVisible = false">取 消</el-button>
        <el-button type="primary" @click="dlgHighBdysVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {setupTest,getProductConfig} from '@/api/api';
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
        options: [],
        selectedOptions: [],
        form1:{
          product:'',
          objects:[]
        },
        formNormal: {
          num1: 25,
          duration: 30,
          testItemLp: ['lp'],
          testItemBdys: []
        },
        formBasic: {
          testItem: []
        },
        formLow: {
          temperature: -55,
          time: 60,
          testItemLp: [],
          testItemBdys: []
        },
        formHigh: {
          temperature: 55,
          time: 60,
          testItemBdys: [],
          testItemLp: []
        },
        formNmLp: {
          duration: 30,
          wait:10,
          frequency:1,
          samples:3200,
          stableFactor:2,
          repeat:6,
          waitCfx: 300,
          durationCfx:300,
          powerDown:300
        },
        formLowLp: {
          duration: 300,
          wait:120,
          samples:3200,
          stableFactor:2
        },
        formHighLp: {
          duration: 300,
          wait:120,
          samples:3200,
          stableFactor:2
        },
        formNmBdys: {
          cycle: 10,
          samples:3200,
          frequency:1,
          repeat:6,
          powerDown:300
        },
        formLowBdys: {
          cycle: 10,
          samples:3600,
          frequency:1
        },
        formHighBdys: {
          cycle: 10,
          samples:3200,
          frequency:1
        },
        formLabelWidth: '120px'
      };
    },
    mounted(){
      let param={ productName:'',productType:''}
      getProductConfig(param).then((res)=>{
        if(res.data.code===200) {
          let data=res.data.data
          //console.log(data.products)
          for (let i=0; i< data.products.length;i++) {
            //console.log(data.products[i])
            this.options.push(
              {
                value: data.products[i],
                label: data.products[i]
              }
            )
          }
          this.form1.product=data.products[0]
          //this.setConfig(data)
        } else {
          alert(res.data.message)
        }
      })
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
              let hash={};
              for(let index in this.form1.objects) {
                if (hash[this.form1.objects[index]]) {
                  alert('表号不能重复');
                  return false;
                } else {
                  hash[this.form1.objects[index]]=true
                }
              }
              let config={}
              config["product"]=this.form1.product
              config["test-type"]='defined'
              //config["ni-dev"]="dev1"
              //config["wx"]="rs232"
              config["test-objects"]= {}
              config["objects-list"]=[]
              for(let index in this.form1.objects) {
                config["test-objects"][index]=this.form1.objects[index]
                config["objects-list"].push(this.form1.objects[index])
              };
              config["test-tasks"]={
                "basic": {
                  "testItems":this.formBasic.testItem
                },
                "normal":{
                  "temperature":this.formNormal.num1,
                  "testItems":this.formNormal.testItemLp.concat(this.formNormal.testItemBdys)
                },
                "low":{
                  "temperature":this.formLow.temperature,
                  "testItems":this.formLow.testItemLp.concat(this.formLow.testItemBdys)
                },
                "high":{
                  "temperature":this.formHigh.temperature,
                  "testItems":this.formHigh.testItemLp.concat(this.formHigh.testItemBdys)
                }
              }
              config["test-settings"]={
                "normal":{
                  "lp":{
                    "duration":this.formNormal.duration,
                    "wait":this.formNmLp.wait,
                    "frequency":this.formNmLp.frequency,
                    "samples":this.formNmLp.samples,
                    "stableFactor":this.formNmLp.stableFactor
                  },
                  "lp_cfx":{
                    "duration":this.formNmLp.durationCfx,
                    "repetition":this.formNmLp.repeat,
                    "wait":this.formNmLp.waitCfx,
                    "powerDown":this.formNmLp.powerDown
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formNmBdys.cycle,
                    "samples":this.formNmBdys.samples,
                    "frequency":this.formNmBdys.frequency
                  },
                  "bdys_cfx":{
                    "repetition":this.formNmBdys.repeat,
                    "powerDown":this.formNmBdys.powerDown
                  }
                },
                "low":{
                  "lp":{
                    "duration":this.formLowLp.duration,
                    "wait":this.formLowLp.wait,
                    "frequency":this.formLowLp.frequency,
                    "samples":this.formLowLp.samples,
                    "stableFactor":this.formLowLp.stableFactor
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formLowBdys.cycle,
                    "samples":this.formLowBdys.samples,
                    "frequency":this.formLowBdys.frequency
                  }
                },
                "high":{
                  "lp":{
                    "duration":this.formHighLp.duration,
                    "wait":this.formHighLp.wait,
                    "frequency":this.formHighLp.frequency,
                    "samples":this.formHighLp.samples,
                    "stableFactor":this.formHighLp.stableFactor
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formHighBdys.cycle,
                    "samples":this.formHighBdys.samples,
                    "frequency":this.formHighBdys.frequency
                  }
                }
              }


              //console.log(config);
              setupTest(config).then((res)=>{
                  if(res.data.code===200) {
                    alert('success!');
                    sessionStorage.testSession=res.data.data.testSession
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
      },

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
