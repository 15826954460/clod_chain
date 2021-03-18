<template>
  <div class="login-wrapper">
    <a-modal
      :visible="visible"
      centered
      :isShowClose="false"
      :closable="false"
      :footer="null"
      :width="450"
    >
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form">
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
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
          { rules: [{ required: true, min: 8, message: '请输入正确格式密码' }] },
        ]"
            type="password"
            placeholder="请输入密码(由数字、大、小写字母、长度 >= 8)"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 0"
        >
          <span class="forget-pass" @click="forgetPass">忘记密码??</span>
          <a-button type="primary" @click="handleSubmit">登陆</a-button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "login-page",

  data() {
    return {
      visible: true
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
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },

    forgetPass() {
      this.visible = false;
      this.form.resetFields();
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang='scss' scoped>
.forget-pass {
  color: rgba(24, 144, 255, 0.7);
  cursor: pointer;
  &:hover {
    color: rgba(24, 144, 255, 1);
    transform: color 1s;
  }
}
</style>
