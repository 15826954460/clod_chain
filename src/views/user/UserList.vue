<template>
  <div class="user-list-container">
    <a-tabs :defaultActiveKey="defaultActiveKey" @change="callback">
      <a-tab-pane
        v-for="item in roleList"
        :key="`${item.value}`"
        :tab="item.label"
      >
        <Plarfrom :userType="item.value"></Plarfrom>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Plarfrom from "@/components/user/Platform.vue";
import { USER_ROLE_TYPE } from "@/constant";
const DEFATULT_ACTIVE_KEY = "2";

import { mapState, createNamespacedHelpers, mapMutations } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

export default {
  name: "user-list-page",

  components: {
    Plarfrom,
  },

  computed: {
    ...mapStateUser({
      userType: (state) => state.userInfo.userType,
    }),

    roleList() {
      let __roleList = [];
      switch (this.userType) {
        case 1:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 1;
          });
          break;
        case 2:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 2;
          });
          break;
        case 3:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType == 4;
          });
          break;
        case 5:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType == 4 || item.userType === 3;
          });
          break;
      }
      return __roleList;
    },
  },

  data() {
    return {
      defaultActiveKey: DEFATULT_ACTIVE_KEY,
    };
  },

  created() {},
  mounted() {},
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
