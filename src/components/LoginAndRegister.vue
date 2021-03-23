<template>
  <a-modal
    :title="isShowLogin ? '' : '注册'"
    :visible="visible"
    centered
    :isShowClose="isShowClose"
    :closable="closable"
    :footer="null"
    :maskStyle="maskStyle"
    :bodyStyle="{ ...bodyStyle, padding: isShowLogin ? '40px' : '20px' }"
    :width="isShowLogin ? 450 : 800"
  >
    <Login
      v-if="isShowLogin"
      @loginRegisterSwitch="loginRegisterSwitch"
      @visibleChange="visibleChange"
    ></Login>
    <Register v-else @loginRegisterSwitch="loginRegisterSwitch" @visibleChange="visibleChange"></Register>
  </a-modal>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "login-and-register",

  props: {
    isShowClose: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object,
      default: () => {
        return {
          backgroundColor: "#f5f5f5"
        };
      }
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: "40px"
        };
      }
    }
  },

  data() {
    return {
      visible: true,
      isShowLogin: true
    };
  },

  components: {
    Login,
    Register
  },

  mounted() {},

  methods: {
    loginRegisterSwitch(bool) {
      this.isShowLogin = bool;
    },

    visibleChange(bool = false) {
      this.visible = bool;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
