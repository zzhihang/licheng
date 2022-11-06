<template>
  <el-dialog v-on="$listeners" v-bind="$attrs">
    <div class="upload-text">上传步骤:</div>
    <div class="upload-text">1.请下载导入模板</div>
    <a href="static/labor.xlsx"></a>
    <el-button type="primary" @click="download" :loading="downloading">下载模板</el-button>
    <!--    <div class="upload-text">2.导入时,以下字段不能为空</div>-->
    <!--    <my-table isIndependent :has-page="false" border style="height: 36px;padding: 0" :min-width="90" :columns="columns">-->
    <!--    </my-table>-->
    <div class="upload-text">2.整理数据</div>
    <el-file-upload model-type="Array" v-model="fileList" accept=".xlsx,.xls" :drag="false" :auto-upload="false">
      <template #tip>
        支持xls或者xlsx格式的文件(文件名请勿输入特殊字符)
      </template>
    </el-file-upload>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="submitFileForm" :loading="uploading">导 入</el-button>
      </span>
  </el-dialog>
</template>

<script>

import { getData } from '@/api/common';

export default {
  name: 'ImportDialog',
  inheritAttrs: false,
  props: {
    fileUrl: {
      default: '',
      type: String
    },
    fileName: {
      default: '',
      type: String
    },
    importUrl: {
      default: '',
      type: String
    }
  },
  computed: {
    columns() {
      return [{
        name: '数据源名称',
        key: 'key0'
      }, {
        name: '数据库名称',
        key: 'key1'
      }, {
        name: '表名称',
        key: 'key2'
      }, {
        name: '增量字段',
        key: 'key3'
      }, {
        name: '字段类型',
        key: 'key4'
      }]
    }
  },
  data() {
    return {
      downloading: false,
      uploading: false,
      submitLoading: false,
      fileList: '',
      modifiedList: []
    }
  },
  watch: {
    '$attrs.visible'(val) {
      if (!val) {
        this.fileList = []
      }
    }
  },
  methods: {
    change(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
    },
    hide() {
      this.$emit('update:visible', false)
    },
    // 下载模板
    download() {
      this.ossDownload(this.fileName,this.fileUrl)
    },
    // 文件上传时
    handleFileUploadProgress() {
      this.submitLoading = true
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    // 提交上传文件
    submitFileForm() {
      if (!this.fileList.length) {
        this.msgWarning('请选择导入文件')
        return
      }
      this.uploading = true
      const file = this.fileList[0]
      const data = new FormData()
      data.append('file', file)
      getData({ data, method: 'put' }).then(res => {
        if (res.code === 200) {
          this.$message.success('导入成功')
          this.hide()
          this.$emit('finish')
        }
      }).finally(() => {
        this.uploading = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.upload-text {
  line-height: 36px;
  white-space: pre-wrap;
}

.el-button, .el-table {
  margin-bottom: 8px;
}

::v-deep {
  .el-dialog__title {
    font-size: 16px;
    color: #303233;
  }

  .el-dialog__body {
    color: #606266;
    font-size: 13px;
  }
}
</style>
