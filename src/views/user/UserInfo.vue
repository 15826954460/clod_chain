<template>
  <div class="user-wrapper">
    <div class="register-wrapper">
      <Register extra=""></Register>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import Register from "@/components/Register.vue";

import { mapState, createNamespacedHelpers, mapMutations } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

export default {
  name: "user-info-page",

  data() {
    return {};
  },

  components: {
    Register,
  },

  mounted() {
    // this.getUserInfo();
  },

  methods: {
    ...mapMutationsUser(['updateUserInfo']),

    async getUserInfo() {
      const { code, data } = await api.getUserInfo();
      if (code === 0) {
        console.log(1111, data);
      } else {
        this.$message.error('获取用户信息失败，请稍后再试')
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.user-wrapper {
  padding: 20px;
  .register-wrapper {
    width: 800px;
  }
}
</style>
