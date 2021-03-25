<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
  >
    <a-form-item
      label="原密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input-password
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入原密码' }] },
        ]"
        placeholder="请输入原密码"
      />
    </a-form-item>
    <a-form-item
      label="新密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input-password
        v-decorator="[
          'newPassword',
          { rules: [{ required: true, message: '请输入新密码' }] },
        ]"
        placeholder="请输入新密码"
      />
    </a-form-item>
    <a-form-item
      label="确认密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input-password
        v-decorator="[
          'surePassword',
          { rules: [{ required: true, message: '请确认密码' }] },
        ]"
        placeholder="请确认密码"
      />
    </a-form-item>
    <div class="__flex __rfec btn-wrapper">
      <a-button style="margin-right: 20px" @click="cancel">取消</a-button>
      <a-button type="primary" @click.self="submit">确定</a-button>
    </div>
  </a-form>
</template>

<script>
import api from "@/axios/api";
import sessionStorage from "@/utils/session-storage";

import { createNamespacedHelpers, mapMutations } from "vuex";
const { mapMutations: mapMutationsUser } = createNamespacedHelpers("user");

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "update-password-com",

  components: {},

  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    };
  },

  methods: {
    ...mapMutations(["updateLogin", "updateToken"]),
    ...mapMutationsUser(["updateUserInfo", "clearUpdateInfo"]),

    cancel() {
      this.$emit("cancel", false);
    },

    submit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        console.log(values);
        if (err) {
          console.log("Received values of form: ", err);
          return;
        }
        const { newPassword, surePassword, password } = values;
        if (newPassword.trim() !== surePassword.trim()) {
          this.$message.error("两次密码输入不一致");
          return;
        }
        const { code } = await api.user.updatePassword({
          newPassword,
          oldPassword: password,
        });
        if (code === 200) {
          this.$message.success("修改密码成功,请重新登陆", 1.5);
          let __timer = setTimeout(() => {
            this.form.resetFields();
            this.clearUpdateInfo();
            this.updateLogin(false);
            this.updateToken();
            sessionStorage.clear();
            clearTimeout(__timer);
            this.$emit("cancel", false);
            __timer = null;
          }, 1000);
        } else {
          this.$message.error("修改密码失败，请稍后再试");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
