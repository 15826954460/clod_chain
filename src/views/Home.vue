<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header
      style="background-color: rgba(0, 21, 41, 0.7); height: 60px; display: flex; flex-direction: row; justify-content: space-between; center; align-items: center; padding: 0 30px 0 50px"
    >
      <div class="logo" />
      <span class="__ellip user-name">用户名</span>
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
            <span slot="title">
              <a-icon type="warning" />报警系统
            </span>
            <a-menu-item key="/warnning">报警列表</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer
      style="text-align: center; height: 60px; padding: 0; display: flex; flex-direction: row; align-items: center; justify-content: center"
    >{{ $t("footer.icp") }}</a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: "app-home",

  data() {
    return {};
  },

  computed: {},

  methods: {
    handleMeunItem({ keyPath, key }) {
      console.log(keyPath, key);
      this.$router.push({ path: `${key}` });
    }
  }
};
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side {
  height: 100vh;
}
.logo {
  display: inline-block;
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
}
.user-name {
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 2px;
  font-size: 16px;
  font-weight: 600px;
  border-radius: 50%;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0, 0.3);
  }
}
</style>
