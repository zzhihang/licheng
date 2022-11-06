<template>
  <div>
    <el-upload action="" :http-request="() => {}" :class="{ drag }" :on-remove="onRemove" :drag="drag" :file-list.sync="fileList" v-bind="$attrs" :on-change="upload"
               :auto-upload="autoUpload" ref="upload" :on-preview="preview" :on-exceed="handleExceed" :disabled="disabled">
      <template v-if="!$slots.defaultt&&$attrs.listType != 'picture-card'">
        <template v-if="drag !== false">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">
            <slot name="tip" />
          </div>
        </template>
        <template v-else>
          <el-button :disabled="disabled" slot="trigger" class="upload" size="small" type="primary">{{ btnName }}</el-button>
          <span slot="tip" class="el-upload__tip">
          <slot name="tip" />
        </span>
        </template>
      </template>
      <i class="el-icon-plus avatar-uploader-icon" v-if="$attrs.listType == 'picture-card'" />
      <template v-if="!$slots.default&&$attrs.listType == 'picture-card'" slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail 666777" :src="getFileUrl(file.path)" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="preview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
      <template v-else>
        <slot />
        <slot slot="tip" name="tip" />
      </template>
    </el-upload>
    <el-image ref="image" style="display: none" :previewSrcList="previewSrcList" />
  </div>
</template>

<script>
import { isImg } from '@/utils/tools'
import upload from '@/utils/oss'
import { v4 as uuidv4 } from 'uuid'
import { isJSON } from '@/utils/tools'
// const extNameMap = {
//   image: '图片',
//   txt: '文本'
// }
const ossUrl = ''
const typeMap = {
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
}
export default {
  name: 'ElFileUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    noModel: {
      type: Boolean,
      default: false
    },
    value2List: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: () => []
    },
    successText: {
      default: '上传成功！',
      type: String
    },
    isClear: {
      default: false,
      type: Boolean
    },
    autoReplace: {
      default: false,
      type: Boolean
    },
    randName: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    },
    modelType: {
      default: 'string',
      type: String
    },
    btnName: {
      default: '点击上传',
      type: String
    },
    drag: {
      default: true,
      type: Boolean
    },
    autoUpload: {
      default: true,
      type: Boolean
    },
    value: {
      type: [String, Array],
      default: null
    },
    extraPath: {
      type: String,
      default: 'file'
    },
    exts: {
      type: Array,
      default() {
        return []
      }
    },
    beforeUpload: {
      type: Function,
      default() {
        return this._beforeUpload
      }
    },
    domain: {
      type: Boolean,
      default: false
    },
    options: {
      default() {
        return null
      }
    }
  },
  inject: {
    elForm: {
      default: ''
    }
  },
  data() {
    return {
      max: 1,
      ossUrl: '',
      fileList: [],
      urlList: [],
      previewImage: '',
      isEmit: false,
      showAdd: true,
      previewSrcList: []
    }
  },
  computed: {
    disabled() {
      return this.$attrs.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    '$refs.upload.uploadDisabled'(val) {
      this.disabled = val
    },
    fileList(arr) {
      console.log(arr)
    },
    isClear(val) {
      val && this.clear()
    },
    '$attrs.limit': {
      handler() {
        this.max = this.$attrs.limit || 1
      },
      immediate: true
    },
    files: {
      handler(arr) {
        this.isEmit = true
        this.fileList = JSON.parse(JSON.stringify(arr || []))
      },
      immediate: true
    },
    domain: {
      handler(val) {
        if (val !== false) {
          this.ossUrl = ossUrl
        } else {
          this.ossUrl = ''
        }
      }
    },
    value: {
      handler(val) {
        if (this.isEmit) {
          this.isEmit = false
          return
        }
        if (this.value2List) {
          if (typeof val === 'string' && isJSON(val)) {
            this.fileList = JSON.parse(val)
          } else {
            this.fileList = val || []
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    preview(file) {
      if (/^image\//i.test(file.type) || isImg(file.name)) {
        this.previewSrcList = [this.getFileUrl(file.path)]
        this.$nextTick(() => {
          this.$refs.image.clickHandler()
        })
      } else {
        this.ossDownload(file.path, file.name)
      }
      // this.viewIndex=this.fileList.indexOf(file)
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`最多上传 ${this.max} 个文件!`)
    },
    onRemove(file, fileList) {
      // upload.delFile(file.path)
      this.fileList = fileList
      const arr = []
      fileList.forEach(({ path }) => path && arr.push(path))
      this.urlList = arr
      this.setValue()
      this.$emit(
        'success',
        this.fileList.filter(({ path }) => path)
      )
    },
    handleRemove(file) {
      let uploadFiles = this.$refs.upload.uploadFiles
      for (var i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i]['url'] == file.url) {
          uploadFiles.splice(i, 1)
        }
      }
    },
    _beforeUpload(file, op = {}) {
      return new Promise((resolve) => {
        if (op.size && op.size < file.size / 1024) {
          this.$message.warning(`文件大小不能超过${op.size}kb`)
          resolve(false)
          return
        }
        if (op.width || op.height) {
          const src = this.getObjectURL(file)
          const img = new Image()
          img.onload = () => {
            const w = img.naturalWidth
            const h = img.naturalHeight
            if (op.width) {
              if (Array.isArray(op.width)) {
                const [min, max] = op.width
                if (w < min || w > max) {
                  this.$message.warning(`图片宽度不符合${min}px~${max}px的要求`)
                  resolve(false)
                  return
                }
              } else {
                if (op.width !== w) {
                  this.$message.warning(`图片宽度不符合${op.width}px的要求`)
                  resolve(false)
                  return
                }
              }
            }
            if (op.height) {
              if (Array.isArray(op.height)) {
                const [min, max] = op.height
                if (h < min || h > max) {
                  this.$message.warning(`图片高度不符合${min}px~${max}px的要求`)
                  resolve(false)
                  return
                }
              } else {
                if (op.height !== h) {
                  this.$message.warning(`图片高度不符合${op.height}px的要求`)
                  resolve(false)
                  return
                }
              }
            }
            if (op.rate && +op.rate !== h / w) {
              this.$message.warning(`图片长宽比不符合要求`)
              resolve(false)
              return
            }
            resolve(true)
          }
          img.src = src
        } else {
          resolve(true)
        }
      })
    },
    uploadFile(file, fileList) {
      if (!this.autoUpload) {
        this.setValue(fileList.map((f) => f.raw))
        return
      }
      const obj = fileList.slice(-1)[0]
      obj.type = file.type
      obj.status = 'uploading'
      new Promise((resolve) => {
        resolve()
      }).then(async() => {
        try {
          const uuid = uuidv4()
          const ext = file.name.replace(/.*(\.[^.]+)/, '$1')
          const filename = this.randName !== false && uuid || `${file.name}/${uuid}`
          upload.uploadFile(file, filename + ext, this.extraPath, ({ type, value }) => {
            switch (type) {
              case 'percent':
                obj.percentage = value.percent
                break
              case 'success':
                // 保存URL
                obj.status = 'success'
                // eslint-disable-next-line no-case-declarations
                const path = `${ossUrl}${value.url}`
                obj.path = path
                this.urlList.push(path)
                this.autoUpload && this.setValue()
                this.fileList = fileList
                this.successText && this.$message.success(this.successText)
                this.$emit('success', fileList)
                break
              case 'error':
                obj.status = 'fail'
                this.$message.error('上传失败，请重试！')
                break
            }
          }, { path: this.path })
        } catch (e) {
          console.error(e)
          this.$message.error('上传失败，请重试！')
        }
      })
    },
    translateType() {
      const type = this.$attrs.accept || '*/*'
      return type
        .split(',')
        .map((item) => {
          return typeMap[item] || item
        })
        .filter((x) => x)
    },
    validateType(file) {
      if (this.$attrs.accept === '*/*' || !this.$attrs.accept) return true
      const ext = file.name.split('.').pop()
      const exp = new RegExp(`^\.?${ext}$`, 'i')
      if (!file.type || this.exts.length) {
        const accept = [...this.translateType(), ...this.exts]
        const res = accept.some(ext => exp.test(ext))
        if (!res) {
          this.$message.error(`请选择${accept.join(',') || this.exts.join(',') || '指定'}类型的文件`)
          return false
        }
        return true
      } else {
        // 文件类型
        const arr1 = file.type.split('/')
        // 可接收的文件
        const accept = this.$attrs.accept || '*/*'
        const arr2 = accept.split(',')
        const res = arr2.some((type) => {
          // 如果accept和文件扩展名相同
          if ('.' + ext === type) {
            return true
          }
          const types = type.split('/')
          if (types[0] !== '*') {
            if (arr1[0] !== types[0]) {
              return false
            }
            return !(types[1] !== '*' && arr1[1] !== types[1])
          }
        })
        if (!res) {
          // const ext = arr2[1] && arr2[1] !== '*' ? arr2[1] : arr2[0]
          // let type
          // const match = ext.match(/(.*?)\/([^*]+)?/) || []
          // type = match[1]
          // const cnName = extNameMap[type]
          // type = cnName || type || ext
          // if (match[2]) {
          //   type = match[2] + type
          // }
          // if (!cnName) {
          //   type += '格式的文件'
          // }
          this.$message.error(`请选择${accept}格式的文件`)
          return false
        }
        return true
      }
    },
    setValue(list) {
      if (this.noModel) return
      //      let arr = list
      //      if (this.domain === false) {
      //        arr = list.map(x => x.replace(ossUrl, '/'))
      //      }
      this.isEmit = true
      if (/string/g.test(this.modelType)) {
        list = list || this.urlList
        this.$emit('change', list.join(','))
      } else {
        list = list || this.fileList
        this.$emit('change', list)
      }
    },
    upload({ raw: file, status }, fileList) {
      if (status !== 'ready') return
      // 限制一个文件时，并且开启自动替换
      if (this.autoReplace !== false && this.max === 1 && fileList.length > this.max) {
        this.onRemove(fileList.splice(0, 1)[0], fileList)
      } else if (this.max && fileList.length > this.max) {
        this.undo(fileList)
        this.$message.error(`最多上传${this.max}个文件`)
        return false
      }
      if (!this.validateType(file)) {
        this.undo(fileList)
        return false
      }
      if (this.beforeUpload instanceof Function) {
        let res
        if (this.options && this.beforeUpload === this._beforeUpload) {
          res = this.beforeUpload(file, this.options)
        } else if (this.beforeUpload) {
          res = this.beforeUpload(file)
        } else {
          this.uploadFile(file, fileList)
        }
        if (res instanceof Promise) {
          res.then((res) => {
            if (!res) {
              this.undo(fileList)
              return false
            }
            this.uploadFile(file, fileList)
          })
        } else if (res) {
          this.uploadFile(file, fileList)
        } else {
          this.undo(fileList)
        }
      } else {
        this.uploadFile(file, fileList)
        console.error('beforeUpload应该是一个方法')
      }
      return false
    },
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    undo(fileList) {
      fileList.pop()
    }, //    removeFile (file) {
    //      const index = this.fileList.findIndex(x => x === file)
    //      this.fileList.splice(index, 1)
    //      this.fileList = [...this.fileList]
    //      this.urlList.splice(index, 1)
    //      this.fileList = [...this.urlList]
    //      this.isEmit = true
    //      this.setValue(this.urlList)
    //    },
    clear() {
      this.fileList = []
      this.$emit('change', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-upload__tip {
  color: #909399;
  letter-spacing: 0;
  font-weight: 400;
  margin-left: 10px;
}

::v-deep {
  .el-upload-list__item {
    transition: all 0s !important;
  }

  .el-upload-dragger .el-upload__text {
    font-size: 13px;
    color: #c0c4cc !important;
    letter-spacing: 0;
    font-weight: 400;
  }

  .el-upload-list__item.is-fail {
    .el-upload-list__item-name {
      color: #f55;

      &:after {
        margin-left: 10px;
        content: '-上传失败';
      }
    }
  }
}
</style>
