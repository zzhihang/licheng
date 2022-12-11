<template>
  <el-dialog
    :visible.sync="visible"
    @close="close"
    class="login-modal"
    width="40%">
    <div class="login">
      <el-form ref="forgetForm" :model="forget" :rules="forgetRules" class="login-form">
        <h1 style="margin-bottom: 34px;font-size: 24px;font-weight: bold;">修改登录密码</h1>
        <el-form-item prop="mobile">
          <el-input v-model="forget.mobile" type="password" auto-complete="off" placeholder="请输入原密码">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="forget.password"
            type="password"
            auto-complete="off"
            placeholder="设置6至20位登录密码"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" style="margin-bottom: 20px;">
          <el-input
            v-model="forget.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="请再次输入登录密码"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <p style="color: #c2bfbf;font-size: 12px;"><span style="color: red">*</span>密码要求有数字、大写字母．小写字母 特殊字符 任选2种 的组合，密码最小长度最少要求有6位，最大20位。</p>
        <el-form-item class="footer-box">
          <el-button @click="close">取消</el-button>
          <el-button :loading="loading" type="primary" @click="handleModify" style="margin-left: 60px;">确定</el-button>
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
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
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
      forget: {
        mobile: '',
        password: '',
        confirmPassword: '',
        authCode: '',
        uuid: '',
      },
      forgetRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '请输入原密码' },
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
  },
  methods: {
    close(){
      this.$emit('update:visible', false)
    },
    isLogin(e) {
      if (e.keyCode === 13) {
        this.handleLogin()
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

.footer-box{
  text-align: center;
  margin-top: 60px;
  .el-button{
    width: 100px;
  }
}

</style>
