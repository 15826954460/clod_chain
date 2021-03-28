<template>
  <div class="user-list-container">
    <a-tabs :defaultActiveKey="defaultActiveKey" @change="callback">
      <a-tab-pane
        v-for="item in userRoleType.slice(1)"
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

export default {
  name: "user-list-page",

  components: {
    Plarfrom,
  },

  data() {
    return {
      userRoleType: USER_ROLE_TYPE,
      defaultActiveKey: DEFATULT_ACTIVE_KEY,
    };
  },

  computed: {},
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
