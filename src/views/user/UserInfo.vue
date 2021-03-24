<template>
  <div class="user-wrapper">
    <div class="register-wrapper">
      <Register extra="" :userInfo="userInfo" :isUpdateUserInfo="true"></Register>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import Register from "@/components/Register.vue";
import { USER_INFO } from "@/constant"

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

  computed: {
    ...mapStateUser({
      userId: state => state.userInfo.userId,
      userInfo: state => state.userInfo,
    }),
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    ...mapMutationsUser(['updateUserInfo']),

    async getUserInfo() {
      const { code, data } = await api.user.getUserInfo({ id: this.userId });
      if (code === 200) {
        const { email, phone, trueName, username, userType, id: userId } = data;
        this.updateUserInfo({ email, phone, trueName, username, userId, userType });
        sessionStorage.set(USER_INFO, { userType, username, trueName, userId, phone, email });
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
