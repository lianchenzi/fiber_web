<template>
  <el-container  algin="center" style="height: 800px; width:800px; border: 1px solid #eee">
    <el-header style="height: 100px;">
    <div style="text-align:center;">
    <slot  name="header"><h2>{{product}}测试结果</h2></slot>
    </div>

    <div class="header">
      <el-col :span="7"><span>表号：{{bh}}</span> </el-col>
      <el-col :span="7"><span>测试类型：{{testType}}</span> </el-col>
      <el-col :span="7"><span>测试时间：{{testDate}}</span> </el-col>
    </div>
    </el-header>
    <el-main>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="item"
        label="测试项"
        width="120">
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="温区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="value"
        label="测试结果"
        width="200">
      </el-table-column>
      <el-table-column
        prop="judgeResult"
        label="结论"
        width="150">
      </el-table-column>
      <!--el-table-column v-if="scope.row.dataFile== '--'"
        prop="dataFile"
        label="数据文件"
        width="150">
      </el-table-column-->
      <el-table-column
        prop="dataFile"
        label="数据文件"
        width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.dataFile=='-'"></div>
          <div v-else>
          <a :href="'http://localhost:5000/download?fileEntry=' + scope.row.dataFile">下载文件</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </el-main>

  </el-container>
</template>

<script>
    //import ElContainer from "../../dist/static/js/vendor";
    export default {
      name: "ResultTable",
      //components: {ElContainer},
      data() {
        return {
          //filePat: '--',
          tableData:[
          ],
          testDate: '',
          product:'',
          bh:'',
          testType:''
        }
      },
      methods: {
        updateTable(val) {
          this.tableData=val
        },
        updateFilePath(filePath) {
          this.filePath=filePath
        },
        updateInfo(param) {
          if (param.bh != null)
            this.bh=param.bh
          if (param.testDate != null)
            this.testDate=param.testDate
          if (param.product != null)
            this.product=param.product
          if (param.testType != null)
            this.testType=param.testType
        }
      }
    }
</script>

<style scoped>

</style>
