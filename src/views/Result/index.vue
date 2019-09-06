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
                start-placeholder="默认为当天"
                end-placeholder="默认为当天"
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
            <el-col :span="10">
              <el-form-item label="测试类型:">
                <el-select v-model="form1.testType" placeholder="请选择测试类型">
                  <el-option label="全部类型" value="all"></el-option>
                  <el-option label="出厂测试" value="zj"></el-option>
                  <el-option label="军检测试" value="jj"></el-option>
                  <el-option label="自定义测试" value="defined"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="表号:">
                <el-input v-model="form1.bh" placeholder="默认为全部"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-col>
          </el-form>
        </el-card>
      <el-table
        :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
        <el-table-column prop="testDate" label="测试日期" width="150"> </el-table-column>
        <el-table-column prop="product" label="产品型号" width="150"> </el-table-column>
        <el-table-column prop="bh" label="产品表号" width="150"> </el-table-column>
        <el-table-column prop="testType" label="测试类型" width="150"> </el-table-column>
        <el-table-column prop="result" label="测试结论" width="150"> </el-table-column>
        <el-table-column prop="session" label="测试详情" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
          layout="prev, pager, next"
          @current-change="current_change"
          :page-size="pagesize"
          background
          :total="total">
        </el-pagination>
      <el-dialog
        title="结果详情"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        width="70%"
        height="100%">’
        <button type="button" id="toPdf" class="btn btn-primary"v-on:click="getPdf()">导出为PDF</button>
        <div class="row" id="pdfDom">
          <result-table ref="resTable"></result-table>
        </div>
        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog>
    </div>

</template>
<script>
  import ResultTable from "../../components/ResultTable";
  import {getResult,getProductConfig} from '@/api/api';
  export default {
    name: "result",
    data() {
      return {
        dialogVisible:false,
        htmlTitle : '',
        form1: {
          product: 'all',
          date:'',
          bh:'',
          testType: 'all'
        },
        options: [
          {
            value: 'all',
            label: '所有产品类型'
          }
        ],
        tableData3: [],
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
        resDict: {
          'defined': '自定义测试',
          'jx':'极性',
          'lz':'阈值',
          'fbl':'分辨率',
          'lp':'零偏',
          'jj':'军检测试',
          'lp_wdx': '零偏稳定性',
          'lp_cfx':'零偏重复性',
          'bdys':'标度因素',
          'bdys_xxd':'标度因素线线度',
          'bdys_cfx':'标度因素重复性',
          'normal':'常温测试',
          'high':'高温测试',
          'low':'低温测试'
        },
        total:8,//默认数据总数
        pagesize:8,//每页的数据条数
        currentPage:1//默认开始页面
      };
    },
    components: {
      'result-table': ResultTable,
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
          //this.form1.product=data.products[0]
          //this.setConfig(data)
        } else {
          alert(res.data.message)
        }
      })
    },
    methods: {
      handleClick(row) {
        this.dialogVisible = true
        console.log(row);
        this.htmlTitle=row.bh +'_' +row.testDate +'_'+row.product+'_'+row.testType
        this.getBhResult(row.bh,row.session)
      },
      formatDate(dateValue) {
        var year = dateValue.getFullYear()
        var month = dateValue.getMonth()+1
        var date = dateValue.getDate()
        if (month < 10) {
          month='0'+month
        }
        if (date <10) {
          date='0'+date
        }
        return [year,month,date].join('-')
      },
      current_change(currentPage){
        this.currentPage = currentPage;
      },
      getBhResult(bh,session) {
        let param={
          'session':session,
          'bh':bh
        }
        getResult(param).then((res)=>{
          console.log(res.data)
          if(res.data.code===200) {
            let resData=res.data.data[0]
            let info={
              bh: bh,
              testDate: resData.testDate,
              product: resData.product,
              testType: this.resDict[resData.testType]
            }
            this.$refs.resTable.updateInfo(info)
            let val=[]
            console.log(resData.result)
            for (let index in resData.result) {
              val.push(
                {
                  item: this.resDict[resData.result[index].testItem],
                  temperature: this.resDict[resData.result[index].temperature],
                  value: resData.result[index].testResult.substr(0,15),
                  judgeResult: resData.result[index].judgeResult===1? '合格':'不合格',
                  dataFile: resData.result[index].dataFile
                }
              )
              this.$refs.resTable.updateTable(val)
            }

          }
        })
      },
      onSubmit() {
        console.log(this.formatDate(new Date()))
        let param={
          bh: 'all',
          startDate: this.formatDate(new Date()),
          endDate: this.formatDate(new Date()),
          testType: 'all',
          product: 'all'

        }
        if (this.form1.date != null && this.form1.date !='') {
          param.startDate = this.formatDate(this.form1.date[0])
          param.endDate = this.formatDate(this.form1.date[1])
        }
        if (this.form1.bh != null && this.form1.bh !='') {
          param.bh = this.form1.bh
        }
        if (this.form1.testType != null && this.form1.testType !='') {
          param.testType = this.form1.testType
        }
        if (this.form1.product != null && this.form1.product !='') {
          param.product = this.form1.product
        }
        console.log(param)
        this.tableData3=[]
        getResult(param).then((res)=>{
          console.log(res.data)
          if(res.data.code===200) {
            let resData=res.data.data
            console.log(resData)
            this.total=resData.length
            for (let i=0; i<resData.length; i++) {
              this.tableData3.push(
                {
                  bh: resData[i].bh,
                  testType: this.resDict[resData[i].testType],
                  product: resData[i].product,
                  result: resData[i].result===1? '合格':'不合格',
                  testDate: resData[i].testDate,
                  session: resData[i].session

                }
              )

            }
          }
        })
      }
    }
  };
</script>
