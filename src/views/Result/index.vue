<template>
    <div class="cube-wrap">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-search"></i>&nbsp;&nbsp;
            <span>测试结果查询</span>
          </div>
          <el-form ref="form1" :model="form1" label-width="100px">
            <el-col :span="10">
            <el-form-item label="测试日期:">
              <el-date-picker
                v-model="form1.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="10">
            <el-form-item label="产品型号:">
              <el-select v-model="form1.product" placeholder="请选择产品">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
          </el-form>

        </el-card>
      <el-table
        :data="tableData3"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="date" label="测试日期" width="80"> </el-table-column>
        <el-table-column prop="type" label="产品型号" width="80"> </el-table-column>
        <el-table-column prop="number" label="产品编号" width="80"> </el-table-column>
        <el-table-column  label="测试项及结果">
          <el-table-column v-for="item in testItems"
                           :prop="item.label"
                           :label="item.name"
                           width="80">
            <!--el-table-column prop="standard" label="判据" width="50"> </el-table-column>
            <el-table-column prop="real" label="测试值" width="65"> </el-table-column-->
          </el-table-column>
        </el-table-column>
        <el-table-column prop="result" label="测试结论" width="80"> </el-table-column>
      </el-table>
    </div>
</template>
<script>
  import {setupTest} from '@/api/api';
  export default {
    name: "result",
    data() {
      return {
        form1: {
          product: '10FA',
          date:''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        testItems:[
          {
            label:'jx',
            name:'极性'
          },
          {
            label:'gh',
            name:'功耗'
          },
          {
            label:'lc',
            name:'量程'
          },
          {
            label:'yz',
            name:'阈值'
          },
          {
            label:'fbl',
            name:'分辨率'
          },
          {
            label:'lp',
            name:'零偏'
          },
          {
            label:'lp_wdx',
            name:'零偏稳定性'
          },
          {
            label:'lp_cfx',
            name:'零偏重复性'
          },
          {
            label:'bdys',
            name:'标度因素'
          },
          {
            label:'bdys_xxd',
            name:'标度因素线性度'
          },
          {
            label:'bdys_cfx',
            name:'标度因素线重复性'
          },
        ],
        options: [{
              value: '10FA',
              label: '10FA'
            }, {
              value: 'A1B2C3',
              label: 'A1B2C3'
            }],
      };
    },
    methods: {
    }
  };
</script>
