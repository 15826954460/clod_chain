<template>
  <div id="app">
    <template>
      <a-layout id="components-layout-demo-top-side">
        <a-layout-header style="background-color: rgba(0, 21, 41, 0.7)">
          <div class="logo" />
        </a-layout-header>
        <a-layout style="background: #fff">
          <a-layout-sider width="200" style="background: #fff">
            <a-menu
              mode="inline"
              :default-selected-keys="['1']"
              :default-open-keys="['sub1']"
              style="height: 100%; padding: 0; border: 1px solid red; overflow-y: scroll"
              theme="dark"
              @click="handleMeunItem"
            >
              <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="deployment-unit" />设备模块</span>
                <a-menu-item key="1"> option1 </a-menu-item>
                <a-menu-item key="2"> option2 </a-menu-item>
                <a-menu-item key="3"> option3 </a-menu-item>
                <a-menu-item key="4"> option4 </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="warning" />报警模块</span>
                <a-menu-item key="5"> option5 </a-menu-item>
                <a-menu-item key="6"> option6 </a-menu-item>
                <a-menu-item key="7"> option7 </a-menu-item>
                <a-menu-item key="8"> option8 </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
            Content
          </a-layout-content>
        </a-layout>
        <a-layout-footer style="text-align: center">
          {{ $t("footer.icp") }}
        </a-layout-footer>
      </a-layout>
    </template>
  </div>
</template>

<script>
export default {
  name: "app-home",

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side {
  height: 100vh;
}
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
