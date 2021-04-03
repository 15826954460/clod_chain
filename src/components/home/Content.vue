<template>
  <a-layout class="components-layout-demo-top-side">
    <a-layout-header
      style="
        background-color: rgba(0, 21, 41, 0.7);
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 0 50px;
      "
    >
      <div class="logo" />
      <a-dropdown>
        <p
          class="__flex __rcc user-name-wrapper"
          style="display: flex; padding: 0 10px; margin: 0; height: 40px"
        >
          <a-icon type="user" style="color: lightblue; margin-right: 8px" />
          <span class="user-name">{{ username }}</span>
          <a-icon type="down" />
        </p>
        <a-menu slot="overlay">
          <a-menu-item>
            <span @click.self="showLookUserInfoChange">个人信息</span>
          </a-menu-item>
          <a-menu-item>
            <span @click.self="updatePasswordHander">修改密码</span>
          </a-menu-item>
          <a-menu-item @click.self="logoutHandle">
            <span>退出登陆</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-layout-header>
    <a-layout style="background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%; padding: 0; overflow-y: scroll"
          theme="dark"
          @click="handleMeunItem"
        >
          <a-menu-item key="/">首页</a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="deployment-unit" />设备信息
            </span>
            <a-menu-item key="/equipment">设备列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"> <a-icon type="warning" />报警系统 </span>
            <a-menu-item key="/warnning">报警列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3" v-show="userType !== 4">
            <span slot="title"> <a-icon type="usergroup-add" />用户中心 </span>
            <a-menu-item key="/user-list">用户列表</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"> <a-icon type="block" />配置 </span>
            <a-menu-item key="/company" v-if="userType !== 4"
              >单位管理</a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer
      style="
        text-align: center;
        height: 40px;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      "
      >{{ $t("footer.icp") }}</a-layout-footer
    >
  </a-layout>
</template>

<script>


import { createNamespacedHelpers, mapMutations } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

export default {
  name: "HomeContentCom",
  data() {
    return {};
  },
  computed: {
    ...mapStateUser({
      username: (state) => state.userInfo.username,
      userType: (state) => state.userInfo.userType,
    }),
  },

  methods: {
    ...mapMutations(["updateLogin", "updateToken"]),
    ...mapMutationsUser(["clearUserInfo"]),

    handleMeunItem({ keyPath, key }) {
      console.log(keyPath, key);
      this.$router.push({ path: `${key}` });
    },

    updatePasswordHander() {
      this.$emit("modifyPassword", true);
    },

    showLookUserInfoChange() {
      this.$emit("modifyUserInfo", true);
    },

    logoutHandle() {
      this.clearUserInfo();
      this.updateLogin(false);
      this.updateToken();
      sessionStorage.clear();
    },
  },
};
</script>

<style scoped lang="scss">
.components-layout-demo-top-side {
  height: 100vh;
  width: 100vw;
}

.logo {
  display: inline-block;
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
}

.user-name-wrapper {
  font-size: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .user-name {
    margin-right: 5px;
  }
}
</style>
