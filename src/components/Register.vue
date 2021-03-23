<template>
  <a-form class="register" :form="form">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item
          label="用户名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入用户名' }] },
            ]"
            placeholder="请输入用户名"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          extra="包含大小写字母、数字、特殊字符,长度>=6"
        >
          <a-input-password
            v-decorator="[
              'password',
              { rules: [{ required: true, validator: this.passwordValidator }] },
            ]"
            placeholder="请输入密码"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item
          label="姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'trueName',
              { rules: [{ required: true, message: '请输入姓名' }] },
            ]"
            placeholder="请输入姓名"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'phone',
              { 
                rules: [
                  { 
                    required: true,
                    message: '请输入有效手机号',
                    pattern: /^1[34578]\d{9}$/
                  },
                ] 
              },
            ]"
            placeholder="请输入手机号"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item
          label="单位名称"
          :label-col="addressItemLayout.labelCol"
          :wrapper-col="addressItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'company',
              { rules: [{ required: true, message: '请输入单位名称' }] },
            ]"
            placeholder="请输入单位名称"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item
          label="选择地址"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-cascader
            :options="options"
            placeholder="请选择地址"
            @change="selAddrChange"
            v-decorator="[
              'area',
              { rules: [{ required: true, message: '请选择地址' }] },
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="邮箱"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'email',
              { rules: [{ required: false, message: '邮箱格式无效', pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ }] },
            ]"
            placeholder="请输入邮箱"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item
          label="详细地址"
          :label-col="addressItemLayout.labelCol"
          :wrapper-col="addressItemLayout.wrapperCol"
        >
          <a-textarea
            v-decorator="[
              'address',
              { rules: [{ required: true, message: '请输入地址' }] },
            ]"
            placeholder="请输入地址"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <div class="__flex __rfec btn-wrapper">
      <a-button style="margin-right: 20px" @click="cancelHandle">取消</a-button>
      <a-button type="primary" @click.self="sureHandle">确定</a-button>
    </div>
  </a-form>
</template>

<script>
import { areaList } from "@/constant/province-data";
import api from "@/axios/api";

// 密码必须有数字、大写、小写、特殊字符组成,长度不能小于8
const pwdRegex = new RegExp(
  /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6}/
);

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const addressItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

export default {
  name: "register-page",

  data() {
    return {
      options: areaList,
      formItemLayout,
      addressItemLayout,
      form: this.$form.createForm(this, { name: "normal_register" })
    };
  },

  components: {},

  created() {},

  mounted() {},

  methods: {
    selAddrChange(value, selOptions) {
      console.log(1111, value, selOptions);
    },

    // 自定义密码验证
    passwordValidator(rule, value, callback) {
      let message = undefined;
      if (!value.length) {
        message = new Error("请输入密码");
      }
      if (value.length < 6) {
        message = new Error("密码长度不能小于6");
      }
      if (!pwdRegex.test(value)) {
        message = new Error("密码必须由大小写字母、数字、特殊字符组成");
      }
      callback(message);
    },

    cancelHandle() {
      this.form.resetFields();
      this.$emit("visibleChange");
    },

    sureHandle(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (err) {
          console.log("Received values of form: ", values);
          return;
        }
        const { area, address, ...options } = values;
        if (area[0] === area[1]) {
          options.are = `${area[1]}市${area[2]}区${address}`;
        } else {
          options.are = `${area[0]}省${area[1]}市${area[2]}区${address}`;
        }
        console.log(111, options);
        const { code, data } = await api.user.register(options);
        if (code === 200) {
          this.$message.success("注册成功,即将跳转到登录页面", 2.5);
          let __timer = setTimeout(() => {
            this.$emit("loginRegisterSwitch", true);
            clearTimeout(__timer);
            __timer = null;
          }, 1000);
        } else {
          this.$message.error("注册失败,请重新尝试");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
