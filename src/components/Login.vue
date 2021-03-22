<template>
  <a-form id="components-form-demo-normal-login" :form="form" class="login-form">
    <p class="__flex __rcc logo-wrapper">
      <i class="__icon logo-img" />
      <span>释格物联管理后台</span>
    </p>
    <a-form-item>
      <a-input
        size="large"
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
        size="large"
        v-decorator="[
          'password',
          { rules: [{ required: true, min: 8, message: '请输入正确格式密码' }] },
        ]"
        type="password"
        placeholder="请输入密码(数字、大、小写字母、长度 >= 8)"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 0"
    >
      <span class="register" @click="registerHander">注册账号</span>
      <a-button type="primary" @click="handleSubmit">登陆</a-button>
    </div>
    <!-- 短信验证业务有待开发 TODO: -->
  </a-form>
</template>

<script>
export default {
  name: "login-page",

  data() {
    return {
    };
  },

  components: {},

  created() {},

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  mounted() {},

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          console.log("Received values of form: ", values);
          return;
        }
        // 接口请求
      });
    },

    registerHander() {
      this.form.resetFields();
      this.$emit('loginRegisterSwitch', false);
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
