<template>
  <div>
    <template v-if="fileType === 'img'">
      <el-image ref="image" :previewSrcList="previewSrcList" />
    </template>
    <template v-if="fileType === 'pdf'">
      <el-dialog :visible.sync="isShowPop">
        <iframe :src="fileUrl" width="100%" height="100%"></iframe>
      </el-dialog>
    </template>
    <template v-if="fileType === 'xlsx'">
      <el-dialog :visible.sync="isShowPop" custom-class="xlsx-pop">
        <div class="xlsx-div">
          <div v-html="tableau"></div>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { isImg } from '@/utils/tools'
import axios from 'axios'
import XLSX from "xlsx";

export default {
  props: {
  },
  data(){
    return{
      previewSrcList:[],//预览图片数组
      fileUrl:'',//文件路径
      isShowPop:false,
      officeUrl:'https://view.xdocin.com/view?src=',
      fileType:'',//文件类型
      tableau:''
    }
  },
  methods:{
    //预览
    preview(file) {
      this.fileType = file.name.split('.').at(-1)
      this.fileUrl=this.getFileUrl(file.path)
      if (/^image\//i.test(file.type) || isImg(file.name)) {
        this.fileType = 'img'
        this.previewSrcList = [this.getFileUrl(file.path)]
        this.$nextTick(() => {
          this.$refs.image.clickHandler()
        })
      } 
      // else if(this.fileType === 'xlsx'){
      //   console.log(this.fileUrl,'this.fileUrl')
      //   axios.get(this.fileUrl,{
      //     responseType: "arraybuffer", // 设置响应体类型为arraybuffer
      //   }).then(({data})=> {
      //     this.isShowPop = true
      //     let workbook = XLSX.read(new Uint8Array(data), {type:"array"}); // 解析数据
      //     let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
      //     this.tableau = XLSX.utils.sheet_to_html(worksheet); // 渲染
      //     console.log(worksheet,'sheet',this.tableau,'this.tableau')
      //   }).catch((err)=>{
      //     console.log(err,'未知错误')
      //   })
      // }else if(this.fileType === 'pdf'){
      //   this.isShowPop = true
      // }
      else{
        this.ossDownload(file.path, file.name)
      }
    },
  }
}
</script>

<style>
.xlsx-pop table{width:100%;border:1px solid#e7e7e7;border-collapse: collapse;text-align: center;}
.xlsx-pop table td{border:1px solid#e7e7e7;height: 36px;}
</style>