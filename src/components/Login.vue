<template>
  <a-form id="components-form-demo-normal-login" :form="form" class="login-form">
    <p class="__flex __rcc logo-wrapper">
      <i class="__icon logo-img" />
      <span>释格物联管理后台</span>
    </p>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
        placeholder="请输入用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入正确格式密码' }] },
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 0"
    >
      <span class="register" @click="registerHander">注册账号</span>
      <a-button type="primary" size="small" @click="handleSubmit">登陆</a-button>
    </div>
    <!-- 短信验证业务有待开发 TODO: -->
  </a-form>
</template>

<script>
import api from "@/axios/api";
import sessionStorage from "@/utils/session-storage";
import { TOKEN, USER_INFO } from "@/constant"

import { mapMutations, createNamespacedHelpers } from "vuex";
const {
  mapMutations: mapMutationsUser
} = createNamespacedHelpers("user");

export default {
  name: "login-page",

  data() {
    return {};
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  mounted() {},

  methods: {
    ...mapMutations(['updateLogin', 'updateToken']),
    ...mapMutationsUser(['updateUserInfo']),

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (err) {
          console.log("Received values of form: ", values);
          return;
        }
        const { code, data: { userType, token, username, trueName, roleName, id: userId, phone, email } } = await api.user.login(values);
        // 接口请求
        if (code === 200) {
          this.updateUserInfo({ userType, username, trueName, roleName, userId, phone, email });
          this.updateToken(token);
          this.updateLogin(true);
          sessionStorage.set(TOKEN, token);
          sessionStorage.set(USER_INFO, { userType, username, trueName, userId, phone, email });
          this.$emit("visibleChange");
        } else {
          this.$message.error('登录失败,请重新尝试');
        }
      });
    },

    registerHander() {
      this.form.resetFields();
      this.$emit("loginRegisterSwitch", false);
    }
  }
};
</script>

<style lang='scss' scoped>
.logo-wrapper {
  height: 50px;
  .logo-img {
    width: 80px;
    height: 40px;
    margin-right: 10px;
    background-image: url("../assets/image/logo.jpeg");
  }
}

.register {
  color: rgba(24, 144, 255, 0.7);
  cursor: pointer;
  &:hover {
    color: rgba(24, 144, 255, 1);
    transform: color 1s;
  }
}
</style>
