<template>
  <div class="manage-container">
    <Plarfrom
      @click="getUserList"
      :loading="loading"
      :roleType="roleType"
      :dataList="data"
      btnText="创建管理员"
    ></Plarfrom>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import utils from "@/utils/common";
import Plarfrom from "@/components/user/Platform.vue";
const USER_TYPE = 2;

export default {
  name: "manage-page",

  components: { Plarfrom },

  data() {
    return {
      loading: false,
      data: [],
      roleType: USER_TYPE,
    };
  },

  mounted() {
    this.getUserList();
  },

  methods: {
    ...mapActions(["getUserListAct"]),

    async getUserList() {
      this.loading = true;
      // 根据当前登陆用户的角色获取用户列表
      const { code, data, msg } = await this.getUserListAct({
        userType: this.roleType,
      });
      if (code === 200) {
        this.data = data;
      } else {
        utils.log(`${msg}-----${code}`);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.manage-container {
  padding: 20px;
}
</style>
