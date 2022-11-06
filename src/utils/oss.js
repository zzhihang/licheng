import { getOssInfo } from '@/api/common'
import Vue from 'vue'
import day from './day'

const OSS = require('ali-oss')
/**
 * 上传文件到 OSS
 *
 * @params file     要上传的文件
 * @params fileName 文件名称
 * @params type     文件类型  image/file/app
 *
 */
let timestamp = 0
let instance
const env = process.env.VUE_APP_ENV

export class Upload {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
    this.env = env
    if (env === 'prod') {
      this.bucket = 'txcj-bid-bj'
      this.region = 'oss-cn-beijing'
    } else {
      this.bucket = 'txcj-bid'
      this.region = 'oss-cn-qingdao'
    }
  }

  initClient() {
    return getOssInfo().then(res => {
      if (res.code !== 200) {
        this.client = null
        Vue.prototype.$message.error('获取上传参数失败')
        return
      }
      const { keyId: accessKeyId, keySecrect: accessKeySecret, token: stsToken } = res.data
      this.client = new OSS({
        accessKeyId, accessKeySecret, stsToken, // stsToken,
        bucket: this.bucket,
        region: this.region,
        secure: true,
        refreshSTSToken: async() => {
          if (Date.now() - timestamp >= 1000 * 60 * 14) {
            const { data } = await getOssInfo()
            timestamp = Date.now()
            return { accessKeyId: data.keyId, accessKeySecret: data.keySecrect, stsToken: data.token }
          } else {
            return { accessKeyId, accessKeySecret, stsToken }
          }
        }
      })
      timestamp = Date.now()
      // 15分钟失效，在剩余100s时重新获取
      setTimeout(() => {
        this.initClient()
      }, 1000 * 60 * 14)
    })
  }

  download(url, filename = '') {
    const a = document.createElement('a')
    if (filename && !/[.].+$/.test(filename)) {
      filename += url.replace(/.*(\.[^.]+)/, '$1')
    }
    let href
    const reg = new RegExp('^\/?(cdn|uat|prod)\/', 'i')
    // 兼容旧数据
    if (reg.test(url)) {
      const response = {
        'content-disposition': `attachment; filename=${encodeURIComponent(filename)}`
      }
      href = this.client.signatureUrl(decodeURIComponent(url), { response })
    } else {
      href = process.env.VUE_APP_BASE_API + url
    }
    a.href = href
    a.download = filename
    a.click()
  }

  getFileUrl(url) {
    if (!url) return url
    const reg = new RegExp(`^\/?(cdn|uat|prod)`, 'i')
    // 兼容旧数据
    if (reg.test(url)) {
      return this.client.signatureUrl(decodeURIComponent(url))
    } else if (/^https?/.test(url)) {
      return url
    } else {
      return process.env.VUE_APP_BASE_API + url
    }
  }

  uploadFile(file, fileName, prefix, callback, { checkpoint, path }) {
    let filePath
    if (path) {
      // 用于上传头像等
      filePath = `${this.env}/${prefix && prefix + '/' || ''}${path}/${fileName}`
    } else {
      filePath = `${this.env}/${prefix && prefix + '/' || ''}/${day.getYMD(new Date()).join('/')}/${fileName}`
    }
    this.client.multipartUpload(filePath, file, {
      checkpoint, progress(value, checkpoint, res) {
        // 获取上传进度 断点续传：checkpoint
        const percent = ~~(value * 100)
        callback({ type: 'percent', value: { percent, checkpoint } })
      }
    }).then(res => {
      const data = {
        code: res.res.status, url: `${filePath}`
      }
      callback({ type: 'success', value: data })
    }).catch(e => {
      const data = {
        code: 500, message: e
      }
      console.log(e)
      callback({ type: 'error', value: data })
    })
  }
}

export default new Upload()
