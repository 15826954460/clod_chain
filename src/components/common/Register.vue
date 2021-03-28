<template>
  <a-form class="register" :form="form">
    <a-form-item
      label="用户名"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'username',
          {
            initialValue: userInfo.username || '',
            rules: [{ required: true, message: '请输入用户名' }],
          },
        ]"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item
      v-if="!isUpdate"
      label="密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :extra="extra"
    >
      <a-input-password
        v-decorator="[
          'password',
          {
            initialValue: userInfo.password || '',
            rules: [{ required: true, validator: this.passwordValidator }],
          },
        ]"
        placeholder="请输入密码"
      />
    </a-form-item>
    <a-form-item
      label="姓名"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'trueName',
          {
            initialValue: userInfo.trueName || '',
            rules: [{ required: true, message: '请输入姓名' }],
          },
        ]"
        placeholder="请输入姓名"
      />
    </a-form-item>
    <a-form-item
      label="手机号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'phone',
          {
            initialValue: userInfo.phone || '',
            rules: [
              {
                required: true,
                message: '请输入有效手机号',
                pattern: /^1[34578]\d{9}$/,
              },
            ],
          },
        ]"
        placeholder="请输入手机号"
      />
    </a-form-item>
    <a-form-item
      label="邮箱"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'email',
          {
            initialValue: userInfo.email || '',
            rules: [
              {
                required: false,
                message: '邮箱格式无效',
                pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
              },
            ],
          },
        ]"
        placeholder="请输入邮箱"
      />
    </a-form-item>
    <!-- 
        <a-form-item
          label="单位名称"
          :label-col="addressItemLayout.labelCol"
          :wrapper-col="addressItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'company',
              {
                initialValue: userInfo.company || '',
                rules: [{ required: true, message: '请输入单位名称' }],
              },
            ]"
            placeholder="请输入单位名称"
          />
        </a-form-item>
     -->
    <!-- 
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
              {
                initialValue: userInfo.area || [],
                rules: [{ required: true, message: '请选择地址' }],
              },
            ]"
          />
        </a-form-item> -->
    <!--
        <a-form-item
          label="详细地址"
          :label-col="addressItemLayout.labelCol"
          :wrapper-col="addressItemLayout.wrapperCol"
        >
          <a-textarea
            v-decorator="[
              'address',
              {
                initialValue: userInfo.address || '',
                rules: [{ required: true, message: '请输入地址' }],
              },
            ]"
            placeholder="请输入地址"
          />
        </a-form-item>
      -->
    <div class="__flex __rfec btn-wrapper">
      <a-button style="margin-right: 20px" @click="cancelHandle">取消</a-button>
      <a-button type="primary" @click.self="submit">确定</a-button>
    </div>
  </a-form>
</template>

<script>
import { areaList } from "@/constant/province-data";
import api from "@/axios/api";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateUser,
  mapActions: mapActionsUser,
} = createNamespacedHelpers("user");

// 密码必须有数字、大写、小写、特殊字符组成,长度不能小于8
const pwdRegex = new RegExp(
  /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6}/
);

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const addressItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

export default {
  name: "register-com",

  props: {
    extra: {
      type: String,
      default: "包含大小写字母、数字、特殊字符,长度>=6",
    },
    userInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: areaList,
      formItemLayout,
      addressItemLayout,
      form: this.$form.createForm(this),
    };
  },

  computed: {
    ...mapStateUser({
      userId: (state) => state.userInfo.userId,
    }),
  },

  methods: {
    ...mapActionsUser(["updateUserInfoAct"]),

    // selAddrChange(value, selOptions) {
    //   console.log(1111, value, selOptions);
    // },

    // 自定义密码验证
    passwordValidator(rule, value, callback) {
      let message = undefined;
      if (!value.length) {
        message = "请输入密码";
      }
      if (value.length < 6) {
        message = "密码长度不能小于6";
      }
      if (!pwdRegex.test(value)) {
        message = "密码必须由大小写字母、数字、特殊字符组成";
      }
      callback(message);
    },

    cancelHandle() {
      this.form.resetFields();
      this.$emit("cancel", this.isUpdate ? false : true);
    },

    submit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (err) {
          console.log("Received values of form: ", err);
          return;
        }
        // const { area, address } = values;
        // if (area[0] === area[1]) {
        //   values.detailAdress = `${area[1]}市${area[2]}区${address}`;
        // } else {
        //   values.detailAdress = `${area[0]}省${area[1]}市${area[2]}区${address}`;
        // }
        if (this.isUpdate) {
          this.updateUserInfo({ ...values, id: this.userId });
        } else {
          this.register(values);
        }
      });
    },

    async register(values) {
      const { code } = await api.user.register(values);
      if (code === 200) {
        this.$message.success("注册成功,即将跳转到登录页面", 2.5);
        let __timer = setTimeout(() => {
          this.$emit("loginRegisterSwitch", true);
          clearTimeout(__timer);
          __timer = null;
        }, 1000);
      }
      if (code === 10036) {
        this.$message.error("该手机号已存在");
      } else {
        this.$message.error("注册失败,请重新尝试");
      }
    },

    async updateUserInfo(values) {
      const { code } = await api.user.updateUserInfo(values);
      if (code === 200) {
        // 待处理
        const { code } = await this.updateUserInfoAct({
          id: this.userId,
        });
        console.log("updateUserInfo====", code);
        if (code === 200) {
          this.$message.success("修改用户信息成功", 1.0);
          let __timer = setTimeout(() => {
            this.$emit("cancel", false);
            clearTimeout(__timer);
            __timer = null;
          }, 1000);
        }
        // 跟新本地的
      } else {
        this.$message.error("修改用户信息,请重新尝试");
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
