<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>军检测试</span>
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
        <el-col v-for="(item,index) in 16" :key=index :span="5">
          <el-form-item :label=generate(index) :prop="'objects.' + index" :rules=dataRules>
            <el-input size="medium" v-model="form1.objects[index]" placeholder="表号" ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div style="text-align:center;">
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="submitForm()">提交测试</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {setupTest,getProductConfig} from '@/api/api';
  export default {
    name: "running",
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
        form1: {
          product: '',
          objects:[]
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
              config['test-type']='jj'
              config["test-objects"]= {}
              config["objects-list"]=[]
              for(let index in this.form1.objects) {
                config["test-objects"][index]=this.form1.objects[index]
                config["objects-list"].push(this.form1.objects[index])
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
