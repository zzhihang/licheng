<template>
  <div class="app-container home">
    <el-dialog
      title="重置密码"
      :visible.sync="isShowResetPass"
      width="30%"
      :showClose="false"
      center
      :close-on-press-escape="false"
    >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="refForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword" placeholder="请输入旧密码">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" placeholder="请输入新密码">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
          <span style="color: #FDAF3F;font-size: 12px">长度不可小于8位，支持字母、数字、特殊字符，区分字母大小写</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="弱"></el-checkbox>
            <el-checkbox label="中"></el-checkbox>
            <el-checkbox label="强"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" placeholder="请确认密码">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlePass">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="successVisible"
      width="25%"
      :showClose="false"
      center
      :close-on-press-escape="false"
    >
      <div style="text-align: center;">
        <svg-icon icon-class="success" style="font-size: 4em" />
        <span style="font-size: 18px;display: block;margin-top: 10px;">恭喜您，密码修改成功！</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleLogin">请使用新密码重新登录 {{ count }} 秒</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Index',
  components: {
  },
  computed: {
    ...mapState('user', ['user']),
    routes() {
      return this.$store.getters.topbarRouters
    },
    checkList() {
      const value = this.ruleForm.newPassword
      if (!this.ruleForm.newPassword) {
        return []
      }
      if (/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$\%\^\&\*\(\)])[0-9a-zA-Z!@#$\%\^\&\*\(\)]{8,}/.test(value)) {// 数字+大写字母+小写字母+特殊字符
        return ['强']
      } else if (/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/.test(value)) { // 数字+大写字母+小写字母
        return ['中']
      } else {
        return ['弱']
      }
    }
  },
  data() {
    var checkPass = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        return callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    }
    return {
      dialogVisible: null,
      isShowResetPass: false, // 重置密码
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '长度不可小于8位', trigger: 'blur' }
          // {
          //   message: '包含大小写字母加数字',
          //   pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/
          // }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ]
      },
      // 定时器
      count: 5,
      timer: null,
      successVisible: false // 修改成功弹窗
    }
  },
  created() {
  },
  methods: {
    /** 取消 */
    handleClose() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/LogOut').then(() => {
          location.href = '/index'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      this.$refs.refForm.resetFields();
    },
    /** 确定 */
    handleSure() {
      this.dialogVisible = false
      this.isShowResetPass = true
    },
    /** 提交 */
    handlePass() {
      const that = this
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          updatePwd(this.ruleForm.oldPassword, this.ruleForm.newPassword).then(res => {
            this.isShowResetPass = false
            that.successVisible = true
            that.sendCode()
          })
        } else {
          return false;
        }
      });
    },
    /** 重新登录 */
    handleLogin() {
      this.$store.dispatch('user/LogOut').then(() => {
        location.href = '/index'
      })
    },
    /** 5S 倒计时 */
    sendCode() {
      this.timer = setInterval(() => {
        // 创建定时器
        if (this.count === 0) {
          // 关闭定时器
          clearInterval(this.timer)
          this.handleLogin()
        } else {
          this.count--
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  background: #F5F6FA;
  padding: 20px 30px;
}

.top-wrap {
  border-radius: 10px;
  background: #FFFFFF;

  ul {
    width: 100%;
    padding: 21.5px 15px 8.5px 15px;
    margin: 0;
  }

  li {
    list-style: none;
    width: calc(25% - 15px);
    border-radius: 12px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 13px;

    .svg-icon {
      width: 63px;
      color: #fff;
      margin: 12px 20px;
      height: 63px;
      border-radius: 12px;
      padding: 20px;
    }

    span {
      font-weight: 500;
      font-size: 18px;
      color: #000000;
    }
  }

  li:nth-child(4n) {
    margin-right: 0;
  }
}

::v-deep .middle-wrap {
  margin-top: 20px;

  .left, .right {
    border-radius: 10px;
    background: #FFFFFF;
    padding: 0 34px;
  }

  .left {
    margin-right: 20px;
    width: 30%;
  }

  .right {
    width: calc(70% - 20px)
  }

  .item-one {
    align-items: center;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0
    }

    .amount {
      width: 40px;
      height: 40px;
      border: 2px solid #FFB74A;
      color: #FFB74A;
      border-radius: 50%;
      font-weight: 500;
      font-size: 16px;
      line-height: 38px;
      text-align: center;
      margin-right: 10px;

      &.majorNum {
        border: 2px solid #FF4A55;
        color: #FF4A55;
      }

      &.rectificationNum {
        border: 2px solid #54C5EB;
        color: #54C5EB;
      }

      &.reviewPassNum {
        border: 2px solid #52B141;
        color: #52B141;
      }
    }

    p {
      margin: 0;
      font-size: 16px;
      color: #22242C;
      font-weight: 400;
      line-height: 23px;
    }

    .progress {
      width: calc(100% - 50px);
    }
  }

  ul {
    padding: 0;
    padding: 0 5px 0 10px;
    margin: 0;

    li {
      padding-bottom: 15px;
    }

    li > div {
      margin-right: 10px;
    }

    li > div:last-child {
      margin-right: 0;
    }
  }

  .content-box {
    padding: 30px 0 40px;
  }

  .seamless-wrap {
    overflow: hidden;
    margin-top: 18px;
    height: 260px;

    .status_item {
      font-weight: 400;
      padding: 16px 4px;
      box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
      border-radius: 10px;
      margin-top: 10px;
      overflow: hidden;
    }

    .status_item > div {
      flex: 1;
      font-size: 14px;
      line-height: 20px;
      color: #91929E;
    }

    .value {
      font-size: 16px;
      line-height: 24px;
      color: #0A1629;
      margin: 0;
      margin-top: 5px;

      &.period {
        color: #FFBD21
      }
    }
  }

  .el-progress-bar {
    padding-right: 0;
  }

  .el-progress__text {
    font-size: 14px !important;
  }
}

.p-title {
  line-height: 26px;
  font-size: 18px;
  color: #22242C;
  font-weight: 500;
  margin: 23px 0 0 0;
}

::v-deep .el-dialog__title {
  font-size: 20px;
}

::v-deep .el-dialog.el-dialog--center {
  margin-top: 15% !important;
}
</style>

