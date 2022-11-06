<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="loginRules" class="login-form">
      <h3 class="title">统一权限认证中心</h3>
      <el-form-item prop="username">
        <el-input v-model="form.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" auto-complete="off" placeholder="密码">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <div slot="suffix" v-if="isCaps" class="is-caps">大写锁定</div>
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaOnOff" prop="code">
        <el-input v-model="form.code" auto-complete="off" placeholder="验证码" style="width: 63%">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode" alt>
        </div>
      </el-form-item>
      <el-checkbox v-model="form.rememberMe" style="margin-bottom:25px;">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click="handleLogin">{{ loading && '登 录 中...' || '登 录' }}</el-button>
        <div v-if="register" style="float: right;">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      form: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: false,
      // 注册开关
      register: true,
      redirect: undefined
    }
  },
  computed: {
    ...mapState('app', ['isCaps'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('keydown', this.isLogin)
    this.getCode()
    this.getCookie()
    const prefix = window.location.hostname.split('.')[0]
  },
  methods: {
    isLogin(e) {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = !!res?.img
        if (this.captchaOnOff) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.form.uuid = res.uuid
        }
      })
    },
    getCookie() {
      const username = localStorage.getItem('username') || ''
      const password = localStorage.getItem('password') || ''
      const rememberMe = Boolean(localStorage.getItem('rememberMe') || false)
      this.form = {
        username,
        password: password && decrypt(password) || '',
        rememberMe
      }
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.rememberMe) {
            localStorage.setItem('username', this.form.username)
            localStorage.setItem('password', encrypt(this.form.password))
            localStorage.setItem('rememberMe', this.form.rememberMe)
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('rememberMe')
          }
          //this.$router.push({ path: this.redirect || '/' }).catch(() => {})
          this.$store.dispatch('user/Login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/' }).catch(() => {})
          }).catch(() => {
            this.loading = false
            if (this.captchaOnOff) {
              this.getCode()
            }
          })
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.isLogin)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("//txcj-cdn.oss-cn-beijing.aliyuncs.com/img/bid/login-bg.png");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}

.is-caps {
  flex: 1;
  text-align: right;
  font-size: 14px;
  color: #ff4949;
}
</style>
