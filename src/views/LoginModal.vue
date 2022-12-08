<template>
  <el-dialog
    :visible.sync="loginVisible"
    @close="close"
    class="login-modal"
    width="40%">
    <div class="login">
      <el-form ref="form" :model="form" :rules="loginRules" class="login-form" v-if="action === 'login'">
        <div style="text-align:center;">
          <img :src="require('@images/login-logo.png')" alt="">
        </div>
        <el-tabs v-model="activeName" style="margin-top: 30px;">
          <el-tab-pane label="账号登录" name="first">
            <el-form-item prop="username">
              <el-input v-model="form.username" type="text" auto-complete="off" placeholder="请输入账号">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" auto-complete="off" placeholder="请输入登录密码">
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
                <div slot="suffix" v-if="isCaps" class="is-caps">大写锁定</div>
              </el-input>
            </el-form-item>
            <el-form-item v-if="captchaOnOff" prop="code">
              <el-input v-model="form.code" auto-complete="off" placeholder="验证码" style="width: 63%">
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" class="login-code-img" @click="getCode" alt>
              </div>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second">
            <el-form-item prop="username">
              <el-input v-model="form.mobile" type="text" auto-complete="off" placeholder="请输入手机号码">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" auto-complete="off" placeholder="请输入短信验证码">
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
                <code-button slot="suffix" url="/auth/senRegisterCode" :mobile="form.mobile"></code-button>
              </el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <div v-if="register" style="display: flex;justify-content: space-between">
          <el-checkbox v-model="form.rememberMe" style="margin-bottom:25px;">记住登录状态</el-checkbox>
          <div>
            <router-link class="link-type" :to="'/register'">注册新用户</router-link>
            <el-button type="text" @click="action = 'forget'" style="margin-left: 24px;">忘记密码？</el-button>
          </div>
        </div>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click="handleLogin">
            {{ loading && '登 录 中...' || '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>


      <el-form ref="forgetForm" :model="forget" :rules="forgetRules" class="login-form" v-if="action === 'forget'">
        <h1 style="margin-bottom: 34px;">忘记密码</h1>
        <el-form-item prop="mobile">
          <el-input v-model="forget.mobile" type="text" auto-complete="off" placeholder="请输入手机号码">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input v-model="forget.authCode" type="password" auto-complete="off" placeholder="请输入短信验证码">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
            <code-button slot="suffix" url="/auth/senResetPassCode" :mobile="forget.mobile" @success="(uuid) => {forget.uuid = uuid}"></code-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="forget.password"
            type="password"
            auto-complete="off"
            placeholder="设置6至20位数字、字母或字符"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="forget.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="请确认密码"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click="handleModify">
            {{ loading && '修 改 中...' || '修 改' }}
          </el-button>
        </el-form-item>
      </el-form>

    </div>
  </el-dialog>

</template>

<script>
import {getCodeImg, getCodeSms, resetPassword} from '@/api/login'
import {encrypt, decrypt} from '@/utils/jsencrypt'
import {mapState} from 'vuex';
import CodeButton from "@components/mine/CodeButton/CodeButton";
import {mobile} from "@utils/rules";

export default {
  components: {
    CodeButton
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.forget.password !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      codeUrl: '',
      action: 'login',
      activeName: 'first',
      state: {
        time: 60,
        smsSendBtn: false
      },
      forget: {
        mobile: '',
        password: '',
        confirmPassword: '',
        authCode: '',
        uuid: '',
      },
      form: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入您的账号'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入您的密码'}
        ],
        code: [{required: true, trigger: 'change', message: '请输入验证码'}]
      },
      forgetRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '请输入您的手机号' },
          mobile
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' },
          { min: 5, max: 20, message: '用户密码长度必须介于 6 和 20 之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '请再次输入您的密码' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ],
        authCode: [{ required: true, trigger: 'change', message: '请输入验证码' }]
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
    ...mapState('app', ['isCaps', 'loginVisible'])
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('keydown', this.isLogin)
    //this.getCode()
    this.getCookie()
    const prefix = window.location.hostname.split('.')[0]
  },
  methods: {
    close(){
      this.$store.dispatch('app/toggleLoginVisible', { visible: false })
    },
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
    handleModify(){
      this.$refs.forgetForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const {
            mobile, authCode, password, uuid
          } = this.forget;
          const result = await resetPassword({
            mobile, authCode, password, uuid
          })
          if(result.code === 200){
            this.action = 'login'
          }
          this.loading = false
        }
      })
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
            this.$router.push({path: this.redirect || '/'}).catch(() => {
            })
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

<style lang="scss" scoped>

::v-deep .el-tabs__header{
  .el-tabs__nav-wrap::after{
    background-color: #ffffff;
  }
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;

  img {
    width: 220px;
  }

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

//.login-modal{
//  ::v-deep .el-dialog{
//    width: 750px !important;
//    height: 767px !important;
//  }
//}

</style>
