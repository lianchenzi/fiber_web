<template>
  <!--div>
    <result-table ref="resTable"></result-table>
  </div-->
  <el-container  algin="center" style="height: 1000px; width:1000px; border: 1px solid #eee">
    <el-header style="height: 100px;">
      <div class="header">
        <el-tabs v-model="activeName" @tab-click="handleClick" disabled="true">
          <el-tab-pane v-for="item in bhs" :name=item :label=item :id='item' :disabled="disableTable">
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-header>
    <el-main>
      <button type="button" id="toPdf" class="btn btn-primary"v-on:click="getPdf()">导出为PDF</button>
      <button type="button" class="btn btn-primary"v-on:click="multiOut()">批量导出</button>
      <div class="row" id="pdfDom">
        <result-table ref="resTable"></result-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import ResultTable from "../../components/ResultTable";
  import {getResult,getBhs} from '@/api/api'
  export default {
    name: "tpl",
    data () {
      return {
        bhs:[],
        activeName: '',
        htmlTitle: '',
        disableTable: false,
        resDict: {
          'defined': '自定义测试',
          'jx':'极性',
          'lz':'阈值',
          'fbl':'分辨率',
          'jj':'军检测试',
          'lp':'零偏',
          'lp_wdx': '零偏稳定性',
          'lp_cfx':'零偏重复性',
          'bdys':'标度因素',
          'bdys_xxd':'标度因素线线度',
          'bdys_cfx':'标度因素重复性',
          'normal':'常温测试',
          'high':'高温测试',
          'low':'低温测试'
        }
      }
    },
    components: {
      'result-table': ResultTable,
    },
    mounted() {
      //sessionStorage.testSession='ExsycmtfSnA7ETD'
      if (sessionStorage.testSession!=null)
      {
        let param={'session':sessionStorage.testSession}
        getBhs(param).then((res)=>{
          if(res.data.code===200) {
            console.log(res.data)
            this.bhs=res.data.data
            if (this.bhs.length>0){
              this.activeName=this.bhs[0]
              this.htmlTitle=this.activeName
              this.getBhResult(this.activeName)

            }

          }
        })
      }
      /*
      let val=[
        {
          item: '零偏',
          temperature: '常温',
          value: '1.34323432',
          judgeResult: '合格',
          dataFile: '--dfad'
        }

      ]
      this.$refs.resTable.updateTable(val)
      let info={bh: this.activeName}
      this.$refs.resTable.updateInfo(info)*/
    },
    methods: {
      handleClick() {
        //console.log(this.activeName)
        //let info={bh: this.activeName}
        //this.$refs.resTable.updateInfo(info)
        //this.htmlTitle=this.activeName
        this.getBhResult(this.activeName)
      },
      multiOut() {
        let i = 0;
        this.disableTable = true
        var interval = setInterval(()=> {
          if (i >= this.bhs.length) {
            clearInterval(interval)
            this.activeName=this.bhs[0]
            this.disableTable = false
          }
          this.activeName=this.bhs[i]
          this.getBhResult(this.activeName)
          if (i >=1) {
            //this.htmlTitle=this.bhs[i-1]
            this.getPdf()
          }
          i+=1
        }, 1000)
      },
      getBhResult(bh) {
        let param={
          'session':sessionStorage.testSession,
          'bh':bh
        }
        getResult(param).then((res)=>{
          console.log(res.data)
          if(res.data.code===200) {
            let resData=res.data.data[0]
            let info={
              bh: this.activeName,
              testDate: resData.testDate,
              product: resData.product,
              testType: this.resDict[resData.testType]
            }
            this.htmlTitle= info.bh +'_' +info.testDate +'_'+info.product+'_'+info.testType
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
      }
    }

  };
</script>
