<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>新增产品</span>
      </div>
        <el-form ref="form1" :model="form1" label-width="150px">
          <el-col :span="10">
          <el-form-item label="产品名称:">
            <el-input v-model="form1.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="10">
          <el-form-item label="产品类型">
            <el-radio-group v-model="form1.type">
              <el-radio label="mn">模拟</el-radio>
              <el-radio label="sz">数字</el-radio>
            </el-radio-group>
          </el-form-item>
          </el-col>
        </el-form>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>自检测试配置</span>
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
            <el-form-item label="温度设置：">
              <el-input-number v-model="formNormal.num1" size="small" :min="15" :max="30"></el-input-number> ℃
            </el-form-item>
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
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>军检测试配置</span>
      </div>
      <el-tabs type="border-card">
        <!--el-tab-pane label="基础测试">
          <el-form ref="form" :model="formBasic2" label-width="100px">
            <el-form-item label="测试选项：">
              <el-checkbox-group v-model="formBasic2.testItem">
                <el-checkbox label="jx"  >极性</el-checkbox>
                <el-checkbox label="lz" >阈值</el-checkbox>
                <el-checkbox label="fbl" >分辨率</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane-->
        <el-tab-pane label="常温测试">
          <el-form ref="form" :model="formNormal2" label-width="120px" >
            <el-form-item label="温度设置：">
              <el-input-number v-model="formNormal2.num1" size="small" :min="15" :max="30"></el-input-number> ℃
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalLpVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal2.testItemLp">
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
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgNormalBdysVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formNormal2.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <br>
                      <el-checkbox label="bdys"  >标度因素</el-checkbox>
                      <el-checkbox label="bdys_cfx" >标度因素重复性</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="低温测试">
          <el-form ref="form" :model="formLow2" label-width="120px">
            <el-form-item label="温度设置：">
              <el-input-number v-model="formLow2.temperature" :min="-65" :max="-40" size="small" ></el-input-number> ℃
            </el-form-item>
            <el-form-item label="保温时间：">
              <el-input-number v-model="formLow2.time" :min="0" :max="7200" size="small" ></el-input-number> 秒
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgLowLpVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formLow2.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标度因素系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgLowBdysVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formLow2.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <el-checkbox label="bdys" >标度因素</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="高温测试">
          <el-form ref="form" :model="formHigh2" label-width="120px">
            <el-form-item label="温度设置：">
              <el-input-number v-model="formHigh2.temperature" :min="45" :max="65" size="small" ></el-input-number> ℃
            </el-form-item>
            <el-form-item label="保温时间：">
              <el-input-number v-model="formHigh2.time" :min="0" :max="7200" size="small" ></el-input-number> 秒
            </el-form-item>
            <el-form-item label="测试选项：">
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>零偏系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgHighLpVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formHigh2.testItemLp">
                      <el-checkbox label="lp" >零偏</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="10">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标度因素系列</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dlgHighBdysVisible2 = true">高级设置</el-button>
                  </div>
                  <div class="text item">
                    <el-checkbox-group v-model="formHigh2.testItemBdys">
                      <el-checkbox label="jx"  >极性</el-checkbox>
                      <el-checkbox label="lz" >阈值</el-checkbox>
                      <el-checkbox label="fbl" >分辨率</el-checkbox>
                      <el-checkbox label="bdys" >标度因素</el-checkbox>
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
        <el-button type="primary" @click="submitForm()">确认添加</el-button>
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

    <el-dialog title="零偏测试设置（常温）" custom-class="customWidth" :visible.sync="dlgNormalLpVisible2" :append-to-body="true">
      <el-form :model="formNmLp2" label-width="200px" >零偏：
        <el-form-item label="测试时间：">
          <el-input-number v-model="formNmLp2.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp2.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formNmLp2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formNmLp2.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
        零偏重复性：
        <el-form-item label="重复次数：">
          <el-input-number v-model="formNmLp2.repeat" size="small" :min="2" :max="8"></el-input-number>
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formNmLp2.waitCfx" size="small" :min="300" :max="7200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="测试时长：">
          <el-input-number v-model="formNmLp2.durationCfx" size="small" :min="300" :max="36000"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="下电时长：">
          <el-input-number v-model="formNmLp2.powerDown" size="small" :min="300" :max="18000"></el-input-number> 秒
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgNormalLpVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgNormalLpVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="零偏测试设置（低温）" custom-class="customWidth" :visible.sync="dlgLowLpVisible2" :append-to-body="true">
      <el-form :model="formLowLp2" label-width="200px" >
        <el-form-item label="测试时间：">
          <el-input-number v-model="formLowLp2.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formLowLp2.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formLowLp2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formLowLp2.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgLowLpVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgLowLpVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="零偏测试设置（高温）" custom-class="customWidth" :visible.sync="dlgHighLpVisible2" :append-to-body="true">
      <el-form :model="formHighLp2" label-width="200px" >
        <el-form-item label="测试时间：">
          <el-input-number v-model="formHighLp2.duration" size="small" :min="300" :max="86400"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="等待时间：">
          <el-input-number v-model="formHighLp2.wait" size="small" :min="120" :max="1200"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formHighLp2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="稳定因子：">
          <el-input-number v-model="formHighLp2.stableFactor" size="small" :min="1" :max="4"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgHighLpVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgHighLpVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（常温）" custom-class="customWidth" :visible.sync="dlgNormalBdysVisible2" :append-to-body="true">
      <el-form :model="formNmBdys2" label-width="200px" >标度因素：
        <el-form-item label="采样周期：">
          <el-input-number v-model="formNmBdys2.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formNmBdys2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formNmBdys2.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
        标度因素重复性：
        <el-form-item label="重复次数：">
          <el-input-number v-model="formNmBdys2.repeat" size="small" :min="2" :max="8"></el-input-number>
        </el-form-item>
        <el-form-item label="下电时长：">
          <el-input-number v-model="formNmBdys2.powerDown" size="small" :min="300" :max="18000"></el-input-number> 分钟
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgNormalBdysVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgNormalBdysVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（低温）" custom-class="customWidth" :visible.sync="dlgLowBdysVisible2" :append-to-body="true">
      <el-form :model="formLowBdys2" label-width="200px" >
        <el-form-item label="采样周期：">
          <el-input-number v-model="formLowBdys2.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formLowBdys2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formLowBdys2.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgLowBdysVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgLowBdysVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标度因素系列（高温）" custom-class="customWidth" :visible.sync="dlgHighBdysVisible2" :append-to-body="true">
      <el-form :model="formHighBdys2" label-width="200px" >
        <el-form-item label="采样周期：">
          <el-input-number v-model="formHighBdys2.cycle" size="small" :min="5" :max="15"></el-input-number> 秒
        </el-form-item>
        <el-form-item label="采样点：">
          <el-input-number v-model="formHighBdys2.samples" size="small" :min="2400" :max="4800"></el-input-number>
        </el-form-item>
        <el-form-item label="采样频率：">
          <el-input-number v-model="formHighBdys2.frequency" size="small" :min="1" :max="3"></el-input-number> 秒/次
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgHighBdysVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dlgHighBdysVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addProduct} from '@/api/api';
  export default {
    name: "new",
    data() {
      return {
        dlgNormalLpVisible: false,
        dlgLowLpVisible: false,
        dlgHighLpVisible: false,
        dlgNormalBdysVisible: false,
        dlgLowBdysVisible:false,
        dlgHighBdysVisible:false,
        dlgNormalLpVisible2: false,
        dlgLowLpVisible2: false,
        dlgHighLpVisible2: false,
        dlgNormalBdysVisible2: false,
        dlgLowBdysVisible2:false,
        dlgHighBdysVisible2:false,
        form1: {
          name:  '',
          type: 'mn'
        },
        formNormal: {
          num1: 25,
          testItemLp: ['lp','lp_cfx'],
          testItemBdys: ['bdys','jx','lz','fbl','bdys_cfx']
        },
        formLow: {
          temperature: -55,
          time: 60,
          testItemLp: ['lp'],
          testItemBdys: ['bdys','jx','lz','fbl']
        },
        formHigh: {
          temperature: 55,
          time: 60,
          testItemBdys: ['bdys','jx','lz','fbl',],
          testItemLp: ['lp']
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
        formNormal2: {
          num1: 25,
          testItemLp: ['lp','lp_cfx'],
          testItemBdys: ['bdys','jx','lz','fbl','bdys_cfx']
        },
        formLow2: {
          temperature: -55,
          time: 60,
          testItemLp: ['lp'],
          testItemBdys: ['bdys','jx','lz','fbl']
        },
        formHigh2: {
          temperature: 55,
          time: 60,
          testItemBdys: ['bdys','jx','lz','fbl',],
          testItemLp: ['lp']
        },
        formNmLp2: {
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
        formLowLp2: {
          duration: 60,
          wait:45,
          samples:36,
          stableFactor:2
        },
        formHighLp2: {
          duration: 60,
          wait:45,
          samples:36,
          stableFactor:2
        },
        formNmBdys2: {
          cycle: 10,
          samples:36,
          frequency:1,
          repeat:6,
          powerDown:60
        },
        formLowBdys2: {
          cycle: 10,
          samples:36,
          frequency:1
        },
        formHighBdys2: {
          cycle: 10,
          samples:36,
          frequency:1
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
        if (this.form1.name===''){
          alert('产品名不能为空');
          return false;
        } else {
          this.$refs['form1'].validate((valid) => {
            if (valid) {
              let config={}
              config["productName"]=this.form1.name
              config['productType']=this.form1.type
              config['zj']={}
              config['zj']["test-tasks"]={
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
              config['zj']["test-settings"]={
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

              config['jj']={}
              config['jj']["test-tasks"]={
                "normal":{
                  "temperature":this.formNormal2.num1,
                  "testItems":this.formNormal2.testItemLp.concat(this.formNormal2.testItemBdys)
                },
                "low":{
                  "temperature":this.formLow2.temperature,
                  "testItems":this.formLow2.testItemLp.concat(this.formLow2.testItemBdys)
                },
                "high":{
                  "temperature":this.formHigh2.temperature,
                  "testItems":this.formHigh2.testItemLp.concat(this.formHigh2.testItemBdys)
                }
              }
              config['jj']["test-settings"]={
                "normal":{
                  "lp":{
                    "duration":this.formNmLp2.duration,
                    "wait":this.formNmLp2.wait,
                    "frequency":this.formNmLp2.frequency,
                    "samples":this.formNmLp2.samples*100,
                    "stableFactor":this.formNmLp2.stableFactor
                  },
                  "lp_cfx":{
                    "duration":this.formNmLp2.durationCfx,
                    "repetition":this.formNmLp2.repeat,
                    "wait":this.formNmLp2.waitCfx,
                    "powerDown":this.formNmLp2.powerDown
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formNmBdys2.cycle,
                    "samples":this.formNmBdys2.samples*100,
                    "frequency":this.formNmBdys2.frequency
                  },
                  "bdys_cfx":{
                    "repetition":this.formNmBdys2.repeat,
                    "powerDown":this.formNmBdys2.powerDown
                  }
                },
                "low":{
                  "lp":{
                    "duration":this.formLowLp2.duration,
                    "wait":this.formLowLp2.wait,
                    "frequency":this.formLowLp2.frequency,
                    "samples":this.formLowLp2.samples*100,
                    "stableFactor":this.formLowLp2.stableFactor
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formLowBdys2.cycle,
                    "samples":this.formLowBdys2.samples*100,
                    "frequency":this.formLowBdys2.frequency
                  }
                },
                "high":{
                  "lp":{
                    "duration":this.formHighLp2.duration,
                    "wait":this.formHighLp2.wait,
                    "frequency":this.formHighLp2.frequency,
                    "samples":this.formHighLp2.samples*100,
                    "stableFactor":this.formHighLp2.stableFactor
                  },
                  "bdys":{
                    "samplesPerSpeed":this.formHighBdys2.cycle,
                    "samples":this.formHighBdys2.samples*100,
                    "frequency":this.formHighBdys2.frequency
                  }
                }
              }
              console.log(config);
              addProduct(config).then((res)=>{
                  if(res.data.code===200) {
                    alert('success!');
                    this.$router.push("product" );
                  } else {
                    alert(res.data.message);
                  }
                }
              )
            }
          })
        }
      },
      handleChange(value) {
        console.log(value);
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
