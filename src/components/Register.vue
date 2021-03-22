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
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'phoneNumber',
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
          label="选择地区"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-cascader
            :options="options"
            placeholder="请选择地区"
            @change="selAddrChange"
            v-decorator="[
              'area',
              { rules: [{ required: true, message: '请输入地址' }] },
            ]"
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

// 密码必须有数字、大写、小写、特殊字符组成,长度不能小于8
const pwdRegex = new RegExp(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8}/);

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
      form: this.$form.createForm(this, { name: "dynamic_rule" })
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
      if (value.length < 8) {
        message = new Error("密码长度不能小于8");
      }
      if (!pwdRegex.test(value)) {
        message = new Error("密码必须由大小写字母、数字、特殊字符组成");
      }
      callback(message);
    },

    cancelHandle() {
      this.form.resetFields();
      this.$emit('visibleChange');
    },

    sureHandle(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log('-----------sureHandle', values);
        if (err) {
          console.log("Received values of form: ", values);
          return;
        }
        const { area, ...options } = values;
        options.area = area.join('');
        // 接口请求
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
