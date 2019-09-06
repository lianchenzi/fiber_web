<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>全局测试配置</span>
      </div>
      <el-col :span="10">
      <el-form ref="form1" :model="form1" label-width="150px">
        <el-form-item label="产品及测试类型选择:">
          <el-cascader
            :options="options"
            expand-trigger="hover"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="10">
      <el-button type="primary" @click="newProduct()">新增产品</el-button>
      </el-col>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>{{getCurrentProduct()}}（可编辑）</span>
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
            <!--el-form-item label="温度设置：">
              <el-input-number v-model="formNormal.num1" size="small" :min="15" :max="30"></el-input-number> ℃
            </el-form-item-->
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalLpVisible = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                      <!--el-checkbox label="lp_wdx"  >零偏稳定性</el-checkbox-->
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
        <el-button type="primary" @click="submitForm()">确认修改 {{getCurrentProduct()}}</el-button>
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
  import {getProductConfig,updateProduct} from '@/api/api';
  //import {getProductConfig} from '@/api/api';
  //import {updateProduct} from '@/api/api';
  export default {
    name: "product",
    data() {
      return {
        dlgNormalLpVisible: false,
        dlgLowLpVisible: false,
        dlgHighLpVisible: false,
        dlgNormalBdysVisible: false,
        dlgLowBdysVisible:false,
        dlgHighBdysVisible:false,

        options: [],
        selectedOptions: [],
        formNormal: {
          num1: 25,
          testItemLp: [],
          testItemBdys: []
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
        formLowLp: {
          duration: 60,
          wait:45,
          samples:36,
          stableFactor:2
        },
        formHighLp: {
          duration: 60,
          wait:45,
          samples:36,
          stableFactor:2
        },
        formNmBdys: {
          cycle: 10,
          samples:36,
          frequency:1,
          repeat:6,
          powerDown:60
        },
        formLowBdys: {
          cycle: 10,
          samples:36,
          frequency:1
        },
        formHighBdys: {
          cycle: 10,
          samples:36,
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
                label: data.products[i],
                children: [{
                  value: 'zj',
                  label: '自检配置'
                }, {
                  value: 'jj',
                  label: '军检配置'
                }
                ]
              }
            )
          }
          this.selectedOptions=[data.product,data.testType]
          this.setConfig(data)
        } else {
          alert(res.data.message)
        }
      })
    },
    methods: {
      generate(index) {
        return "表号" + (index+1) + ":"
      },
      setConfig(config) {
        let testItem=config["test-tasks"]
        //console.log(testItem)
        this.formNormal.num1=testItem['normal']['temperature']
        this.formNormal.testItemLp=[]
        this.formNormal.testItemBdys=[]
        for (let i=0; i<testItem['normal']['testItems'].length;i++) {
          //console.log(testItem['normal']['testItems'][i])
          if (testItem['normal']['testItems'][i].startsWith('lp')) {
            //console.log(testItem['normal']['testItems'][i])
            this.formNormal.testItemLp.push(testItem['normal']['testItems'][i] )
          } else {
            this.formNormal.testItemBdys.push(testItem['normal']['testItems'][i] )
          }
        }

        this.formLow.temperature=testItem['low']['temperature']
        this.formLow.testItemLp=[]
        this.formLow.testItemBdys=[]
        for (let i=0; i<testItem['low']['testItems'].length;i++) {
          if (testItem['low']['testItems'][i].startsWith('lp')) {
            this.formLow.testItemLp.push(testItem['low']['testItems'][i] )
          } else {
            this.formLow.testItemBdys.push(testItem['low']['testItems'][i] )
          }
        }

        this.formHigh.temperature=testItem['high']['temperature']
        this.formHigh.testItemLp=[]
        this.formHigh.testItemBdys=[]
        for (let i=0; i<testItem['high']['testItems'].length;i++) {
          if (testItem['high']['testItems'][i].startsWith('lp')) {
            this.formHigh.testItemLp.push(testItem['high']['testItems'][i] )
          } else {
            this.formHigh.testItemBdys.push(testItem['high']['testItems'][i] )
          }
        }
        let testSettings=config["test-settings"]

        this.formNmLp.duration=Number(testSettings['normal']['lp']['duration'])
        this.formNmLp.wait=Number(testSettings['normal']['lp']['wait'])
        this.formNmLp.frequency=Number(testSettings['normal']['lp']['frequency'])
        this.formNmLp.samples=Number(testSettings['normal']['lp']['samples'])
        this.formNmLp.stableFactor=Number(testSettings['normal']['lp']['stableFactor'])

        this.formNmLp.durationCfx=Number(testSettings['normal']['lp_cfx']['duration'])
        this.formNmLp.repeat=Number(testSettings['normal']['lp_cfx']['repetation'])
        this.formNmLp.waitCfx=Number(testSettings['normal']['lp_cfx']['wait'])
        this.formNmLp.powerDown=Number(testSettings['normal']['lp_cfx']['powerDown'])

        this.formNmBdys.cycle=Number(testSettings['normal']['bdys']['samplesPerSpeed'])
        this.formNmBdys.samples=Number(testSettings['normal']['bdys']['samples'])
        this.formNmBdys.frequency=Number(testSettings['normal']['bdys']['frequency'])

        this.formNmBdys.repeat=Number(testSettings['normal']['bdys_cfx']['repetation'])
        this.formNmBdys.powerDown=Number(testSettings['normal']['bdys_cfx']['powerDown'])


        this.formLowLp.duration=Number(testSettings['low']['lp']['duration'])
        this.formLowLp.wait=Number(testSettings['low']['lp']['wait'])
        this.formLowLp.frequency=Number(testSettings['low']['lp']['frequency'])
        this.formLowLp.samples=Number(testSettings['low']['lp']['samples'])
        this.formLowLp.stableFactor=Number(testSettings['low']['lp']['stableFactor'])

        this.formLowBdys.cycle=Number(testSettings['low']['bdys']['samplesPerSpeed'])
        this.formLowBdys.samples=Number(testSettings['low']['bdys']['samples'])
        this.formLowBdys.frequency=Number(testSettings['low']['bdys']['frequency'])

        this.formHighLp.duration=Number(testSettings['high']['lp']['duration'])
        this.formHighLp.wait=Number(testSettings['high']['lp']['wait'])
        this.formHighLp.frequency=Number(testSettings['high']['lp']['frequency'])
        this.formHighLp.samples=Number(testSettings['high']['lp']['samples'])
        this.formHighLp.stableFactor=Number(testSettings['high']['lp']['stableFactor'])

        this.formHighBdys.cycle=Number(testSettings['high']['bdys']['samplesPerSpeed'])
        this.formHighBdys.samples=Number(testSettings['high']['bdys']['samples'])
        this.formHighBdys.frequency=Number(testSettings['high']['bdys']['frequency'])

      },
      submitForm() {
        //console.log(this.formBasic.testItem)
              let config={}
              config["product"]=this.selectedOptions[0]
              config['testType']=this.selectedOptions[1]
              config['config']={}
              config['config']["test-tasks"]={
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
              config['config']["test-settings"]={
                "normal":{
                  "lp":{
                    "duration":this.formNmLp.duration,
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
              console.log(config);
              updateProduct(config).then((res)=>{
                  if(res.data.code===200) {
                    alert('修改成功');
                    //this.$router.push("running" );
                  } else {
                    alert(res.data.message);
                  }
                }
              )
      },
      getCurrentProduct() {
        let prod=this.selectedOptions[0]+'-'
        if(this.selectedOptions[1]=='zj') {
          prod+='自检配置 '
        } else {
          prod+='军检配置 '
        }
        return prod
      },
      handleChange() {
        let param={ productName:this.selectedOptions[0],productType:this.selectedOptions[1]}
        getProductConfig(param).then((res)=>{
          console.log(res.data)
          if(res.data.code===200) {
            let data=res.data.data
            this.setConfig(data)
          } else {
            alert(res.data.message)
          }
        })
      },
      newProduct() {
        this.$router.push("new" );
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
