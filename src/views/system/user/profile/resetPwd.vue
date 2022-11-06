<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
        show-password
      />
      <span style="color: #fdaf3f; font-size: 12px"
        >长度不可小于8位，支持字母、数字、特殊字符，区分字母大小写</span
      >
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="弱"></el-checkbox>
        <el-checkbox label="中"></el-checkbox>
        <el-checkbox label="强"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
      <span v-if="isCaps" class="is-caps">大写锁定</span>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("app", ["isCaps"]),
    checkList() {
      const value = this.user.newPassword;
      if (!this.user.newPassword) {
        return [];
      }
      if (
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$\%\^\&\*\(\)])[0-9a-zA-Z!@#$\%\^\&\*\(\)]{8,}/.test(
          value
        )
      ) {
        // 数字+大写字母+小写字母+特殊字符
        return ["强"];
      } else if (/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/.test(value)) {
        // 数字+大写字母+小写字母
        return ["中"];
      } else {
        return ["弱"];
      }
    },
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 8, message: "长度不可小于8位", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: equalToPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(
            (response) => {
              this.$modal.msgSuccess("修改成功");
            }
          );
        }
      });
    },
    close() {
      this.$tab.closePage();
    },
  },
};
</script>
<style scoped>
.is-caps {
  text-align: right;
  font-size: 14px;
  color: #ff4949;
  margin-left: 16px;
}
</style>
