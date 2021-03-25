<template>
  <div>
    <LoginAndRegister
      v-if="!isLogined"
      :visible="loginAndRegisterShow"
      @changeLoginAndRegisterShow="changeLoginAndRegisterShow"
    ></LoginAndRegister>
    <a-layout v-show="isLogined" class="components-layout-demo-top-side">
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
              <span @click.self="showLookUserInfoChange(true)">个人信息</span>
            </a-menu-item>
            <a-menu-item>
              <span @click.self="updatePasswordHander(true)">修改密码</span>
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
            <a-sub-menu key="sub3">
              <span slot="title">
                <a-icon type="deployment-unit" />个人中心
              </span>
              <a-menu-item key="/user-info">个人信息</a-menu-item>
              <a-menu-item key="/update-secret">修改密码</a-menu-item>
              <a-menu-item key="/option-log">操作日志</a-menu-item>
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
    <CusModule
      v-if="updateUserInfoModuleShow"
      :visible="updateUserInfoModuleShow"
      title="修改用户信息"
      @cancel="showLookUserInfoChange"
    >
      <Register
        :isUpdate="true"
        :userInfo="userInfo"
        @cancel="showLookUserInfoChange"
      ></Register>
    </CusModule>
    <CusModule
      v-if="updatePasswordModuleShow"
      :visible="updatePasswordModuleShow"
      title="修改密码"
      @cancel="updatePasswordHander"
    >
      <UpdatePassword @cancel="updatePasswordHander"></UpdatePassword>
    </CusModule>
  </div>
</template>

<script>
import sessionStorage from "@/utils/session-storage";
import { TOKEN, USER_INFO } from "@/constant";

import { mapState, createNamespacedHelpers, mapMutations } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

import LoginAndRegister from "@/components/LoginAndRegister.vue";
import CusModule from "@/components/CusModule.vue";
import Register from "@/components/Register.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";

export default {
  name: "app-home",

  data() {
    return {
      updateUserInfoModuleShow: false,
      updatePasswordModuleShow: false,
      loginAndRegisterShow: true,
    };
  },

  components: {
    LoginAndRegister,
    CusModule,
    Register,
    UpdatePassword,
  },

  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
    ...mapStateUser({
      username: (state) => state.userInfo.username,
      userInfo: (state) => state.userInfo,
    }),
  },

  created() {
    const token = sessionStorage.get(TOKEN);
    const userInfo = sessionStorage.get(USER_INFO);
    this.updateLogin(token ? true : false);
    this.updateUserInfo(userInfo ? userInfo : {});
  },

  methods: {
    ...mapMutations(["updateLogin", "updateToken"]),
    ...mapMutationsUser(["updateUserInfo", "clearUpdateInfo"]),

    handleMeunItem({ keyPath, key }) {
      console.log(keyPath, key);
      this.$router.push({ path: `${key}` });
    },

    logoutHandle() {
      this.clearUpdateInfo();
      this.updateLogin(false);
      this.updateToken();
      sessionStorage.clear();
    },

    updatePasswordHander(bool) {
      this.updatePasswordModuleShow = bool;
    },

    showLookUserInfoChange(bool) {
      this.updateUserInfoModuleShow = bool;
    },

    changeLoginAndRegisterShow(bool) {
      this.loginAndRegisterShow = bool;
    },
  },
};
</script>

<style lang="scss" scoped>
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