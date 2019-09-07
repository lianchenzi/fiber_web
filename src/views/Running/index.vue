<template>
  <div class="m-home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
            <i class="fa fa-tasks" style="color: #F56C6C;"></i>  运行状态
            <p class="m-count">{{ info.running }}</p>

        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
            <i class="fa fa-cogs" style="color: #E6A23C;"></i> 正在进行
            <p class="m-count">{{ info.test }}</p>

        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
            <i class="fa fa-thermometer" style="color: #67C23A;"></i>  温箱温度
            <p class="m-count">{{ info.temperature }}</p>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
            <i class="fa fa-flash" style="color: #409EFF;"></i>  温箱电流
            <p class="m-count">{{ info.current }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="24">
        <el-card class="m-box-card" shadow="hover">
          <div slot="header">
              <i class="fa fa-line-chart" style="color: #408080"></i>  测试进度
          </div>
          <div>
            <el-tabs type="border-card" :value="activeName">
              <el-tab-pane v-for="(item, index) in testTask" :name=getIndex(index)  :label=getTestChsName(item.item)>
                <!--span slot="label" style="padding: 8px">
                    <i :class=getIcon(task.status)  :style=getIconColor(task.status)></i>
                </span-->
                <div>
                  <el-steps  finish-status="success" simple>
                    <el-step  v-for="test in item.tests" :title=getTestChsName(test.name) :status=getStatus(test.status) :icon=getIcon(test.status)>
                    </el-step>
                  </el-steps>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="24">
        <el-card class="m-box-card" shadow="hover">
          <el-button type="warning" icon="fa fa-stop" :disabled="stopBtn" @click="ctrlRunning('stop')"> 停止测试</el-button>
          <el-button type="primary" icon="el-icon-refresh" :disabled="refreshBtn" @click="ctrlRunning('restart')"> 重启测试</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="10">
      <el-col :span="12">
        <el-card class="m-box-card" shadow="hover">
            <div slot="header">
                <i class="fa  fa-superpowers" style="color: #EA7500"></i>  电压监控
            </div>
          <div>
           <ve-line
             :data="chartData3"
             :extend="chartExtend"
             :data-zoom="dataZoom"
             :settings="chartSettings3">
           </ve-line>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="m-box-card" shadow="hover">
          <div slot="header">
            <i class="fa  fa-superpowers" style="color: #EA7500"></i>  电流监控
          </div>
          <!--div>
            <ve-line :data="chartData3"  :extend="chartExtend" :settings="chartSettings3" ></ve-line>
          </div-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  import VeScatter from 'v-charts/lib/scatter.common'
  import {getRunningInfo,runningControl} from '@/api/api'

  export default {
    name: 'FuncHome',
    components: {
      VeLine,
      VeScatter
    },
    data () {

      this.grid = {
        show: true,
        top: 50,
        left: 10,
        backgroundColor: '#ccc',
        borderColor: '#000'
      }
      return {
        stopBtn: true,
        refreshBtn: true,
        chartExtend:{
          'xAxis.0.axisLabel.rotate': 45,
          series: {
            showSymbol: false,
            type: 'line',
            lineStyle: {
              normal :{
                width: 0.5
              }
            }
          }
        },
        dataZoom : [
          {
            type: 'slider',
            start: 0,
            end: 20
          }
        ],
         activeName: "0",
        timer: 0,
        filePath: "data\\2019-08-08\\10FA\\lp_normal\\0.log",
        testsDict :{
          'Busy':'工作中',
          'Ideal':'空闲',
          'jx':'极性',
          'lz':'阈值',
          'fbl':'分辨率',
          'lp':'零偏',
          'lp_cfx':'零偏重复性',
          'bdys':'标度因素',
          'bdys_cfx':'标度因素重复性',
          'warmUP':'温箱预热',
          'basic':'基础测试',
          'normal':'常温测试',
          'high':'高温测试',
          'low':'低温测试'
        },
        testTask: [],
        info: {
          running: '空闲',
          test: '无',
          temperature: '℃',
          current: 'A'
        },
        item :{
          host: "http://localhost:5000",
          link: "download"
        },
        chartSettings3: {
          axisSite: '',
          digit: 8
        },
        chartData3: {
          rows: [],
          columns:[]
         }
      }
    },
    mounted(){
      /*
      let param='empty=abc';
      getRunningInfo(param).then((res)=>{
        if(res.data.code===200) {
          console.log(res.data)
          if (JSON.stringify(res.data.data) != "{}") {
            this.updateBasicInfo(res.data.data.info)
            this.testTask=res.data.data.status;
            this.updateChart(res.data.data.buf);
            this.getSelectedTab();
          } else {
            console.log('empty')
            this.initPageData()
          }
        }
      })*/
      //console.log(sessionStorage)
      if(this.timer){
        clearInterval(this.timer)
      }else{
        this.timer = setInterval(()=>{
          // 调用相应的接口，渲染数据
          this.getData()
          //console.log('hello')
        },1000)
      }
      //this.toggleFullscreen();
      //this.$store.state.isCollapse = true;
      //this.toggleSiderBar();
      //this.getData()
      //this.timer()

    },
    /*updated() {
      this.timer()
    },*/
    destroyed() {
      clearTimeout(this.timer)
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      getTestChsName(name) {
        return this.testsDict[name]
      },
      ctrlRunning(action) {
        let param={'action': action}
        //let param='action='+action
        console.log(param)
        runningControl(param).then((res)=>{
            if(res.data.code===200) {
              let msg=''
              if (action==='stop')
              {
                msg='停止测试成功'
                sessionStorage.testSession= null
                sessionStorage.removeItem(testSession)
              }
              else
              {
                msg='重启测试成功'
              }
              alert(msg)
              sessionStorage.testSession=res.data.data.testSession
            } else {
              alert('操作失败')
            }
        }
        )
        this.getData()
      },
      getIndex(idx) {
        return idx+''
      },
      toggleSiderBar() {
        this.$store.commit(types.TOGGLE)
      },
      toggleFullscreen() {
        if (!screenfull.enabled) {
          this.$message.warning('您的浏览器不支持全屏')
          return false
        }
        //screenfull.toggle()
        //screenfull.isFullscreen= true;
        if (screenfull.isFullscreen === false) {
          screenfull.toggle()
        }
        //screenfull.toggle()
        // isFullscreen 居然是反的
        this.isFullscreen = !screenfull.isFullscreen;
      },
      
     /* timer() {
        return setTimeout(()=>{
          this.getData()
        },2000)
      },*/
      initPageData() {
        this.chartData3.columns=[]
        this.chartData3.rows=[]
        this.chartSettings3.axisSite=''
        this.testTask=[]
        this.info.current='A'
        this.info.temperature='℃'
        this.info.running='空闲'
        this.info.test='无'
        this.stopBtn=true
        this.refreshBtn=true
      },
      updateChart(res) {
        //this.chartData3.rows.push({'time':res.data[0],'cpu':res.data[1]})
        if (JSON.stringify(res) == "{}") {
          this.chartData3.columns=[]
          this.chartData3.rows=[]
        }
        else {
          this.stopBtn=false
          this.refreshBtn=false
          if (res.test==='lp' || res.test==='lp_cfx') {
            this.chartSettings3.axisSite='time'
          }
          if (res.test==='bdys' || res.test==='bdys_cfx') {
            this.chartSettings3.axisSite='speed'
          }
          //console.log(res.buf.length)
          if (res.buf.length>100) {
            this.dataZoom[0].start=res.buf.length-101
          } else {
            this.dataZoom[0].start=0
          }
          this.dataZoom[0].end=res.buf.length-1
          this.chartData3.columns=res.object
          this.chartData3.rows=res.buf
        }

        //console.log(this.chartData3)

      },
     /* send(){
        console.log('1111111');
        this.$socket.emit('message','1111111111');
      },*/
      getStatus(stat) {
        if (stat===0) {
          return 'wait'
        } else if (stat===1) {
          return 'success'
        } else {
          return 'process'
        }
      },
      getData() {
        let param='empty=abc';
        getRunningInfo(param).then((res)=>{
          if(res.data.code===200) {
            //console.log(res.data)
            if (JSON.stringify(res.data.data) != "{}") {
              this.updateBasicInfo(res.data.data.info)
              this.testTask=res.data.data.status;
              this.updateChart(res.data.data.buf);
              this.getSelectedTab();
              this.stopBtn=false
              this.refreshBtn=false
            } else {
              this.initPageData()
              if ( sessionStorage.testSession && sessionStorage.testSession != "null" ) {
                this.$router.push("runresult");
              }
            }
          }
        })
      },
      getIcon(stat) {
        if (stat===0) {
          return 'el-icon-time'
        } else if (stat===1) {
          return 'el-icon-circle-check-outline'
        } else {
          return 'el-icon-loading'
        }
      },
      getIconColor(stat) {
        if (stat===0) {
          return 'color: #9D9D9D'
        } else if (stat===1) {
          return 'color: #00EC00'
        } else {
          return 'color: #0080FF'
        }
      },
      updateBasicInfo(res) {
        this.info.running=this.testsDict[res.running]
        this.info.test=this.testsDict[res.test]
        this.info.temperature=res.temperature+'℃'
        this.info.current=res.current+'A'
      },
      getSelectedTab() {
        for(let i=0; i<this.testTask.length;i++) {
          if (this.testTask[i].status===2) {
            //console.log(i)
            this.activeName=i+"";
            break;
          }
        }
      },
    },

   /* sockets: {

     server_response: function (res) {
        //以下对接收来的数据进行操作

        console.log(res)
        this.updateChart(res)
      },
      updateStatus: function (res) {
        //以下对接收来的数据进行操作

        //console.log(res)
        //this.updateChart(res)
        this.testTask=res
        this.getSelectedTab()
      },
      updateInfo: function (res) {
        //以下对接收来的数据进行操作

        //console.log(res)
        //this.updateChart(res)
        this.updateBasicInfo(res)
      },
      initialPage: function () {
        //以下对接收来的数据进行操作

        //console.log(res)
        //this.updateChart(res)
        this.info.running='空闲'
        this.info.test='无'
        this.info.temperature='℃'
        this.info.current='A'
        this.testTask=[]
        this.chartSettings3.axisSite=''
        this.chartData3.rows=[]
        this.chartData3.columns=[]
        this.stopBtn=true
        this.refreshBtn=true
        this.$router.push("runresult");

      },
      connect: function(){
        console.log('socket connected')
      }
    },*/
  }
</script>

<style scoped lang="scss">
  .m-home {
    .m-box-card {
      margin-bottom: 10px;
      color: #666666;
      .m-icon {
        float: left;
        width: 60px;
        i {
          font-size: 40px;
        }
      }
      .m-content {
        margin-left: 60px;
        .m-count {
          font-size: 20px;
        }
      }
    }
    .m-task-box {
      margin-bottom: 20px;
      .m-task-text {
        float: left;
        line-height: 16px;
      }
      .m-task-pro {
        margin-left: 60px;
      }
    }
  }

</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-step.is-vertical {
    height: 50%;
  }
</style>
