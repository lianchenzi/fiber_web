<template>
  <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>&nbsp;&nbsp;
          <span>温箱配置</span>
        </div>

        <el-form ref="form1" :model="form1" label-width="100px">
        <el-col :span="5">
          <el-form-item label="温箱选择:">
            <el-select v-model="form1.wx" placeholder="温箱类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="5">
          <el-form-item label="端口号:">
            <el-input size="medium" v-model="form1.com"></el-input>
          </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>采集卡配置</span>
      </div>

      <el-form ref="form1" :model="form1" label-width="100px">
        <el-col :span="5">
          <el-form-item label="电压采集卡:">
              <el-input size="medium" v-model="form2.voltage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="电流采集卡:">
            <el-input size="medium" v-model="form2.current"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="其它板卡:">
            <el-input size="medium" v-model="form2.other"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div style="text-align:center;">
        <el-button type="primary" @click="submitForm()">确认</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {getDevice} from '@/api/api'
  import {setDevice} from '@/api/api'
  export default {
    name: 'board',
    data() {
      return {
        form1: {
          wx: '',
          com:''
        },
        form2: {
          voltage: '',
          current:'',
          other:''
        },
        options: [
        ],
      }
    },
    mounted(){
      let param='empty=abc';
      getDevice(param).then((res)=>{
        if(res.data.code===200) {
          console.log(res.data.data)
          let wxList=res.data.data.wxList

          for (let i=0;i<wxList.length;i++) {
            console.log(wxList)
            this.options.push(
              {
                label:wxList[i],
                value:wxList[i]
              }
            )
          }
          this.form1.wx=res.data.data.wx.wxtype
          this.form1.com=res.data.data.wx.com
          this.form2.voltage=res.data.data.board.voltage
          this.form2.current=res.data.data.board.current
          this.form2.other=res.data.data.board.other

        }
      })

    },
    methods: {
      submitForm() {
        let config={}
        config['wx']={}
        config['board']={}
        if (this.form1.wx != '') {
          config['wx']['wxtype']=this.form1.wx
        }
        if (this.form1.com!=''){
          config['wx']['com']=this.form1.com
        }
        if (this.form2.voltage!='') {
          config['board']['voltage']=this.form2.voltage
        }
        if (this.form2.current!='') {
          config['board']['current']=this.form2.current
        }
        if (this.form2.other!='') {
          config['board']['other']=this.form2.other
        }
        console.log(config)

        setDevice(config).then((res)=>{
          if(res.data.code===200) {
            alert('success!');
          } else {
            alert(res.data.message);
          }
        }
        )
      }
    },
    components: {
      //ContactCard,
    }
  };
</script>
<style scoped lang="scss">

</style>
