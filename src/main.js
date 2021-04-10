import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n/index";
import Antd from 'ant-design-vue'

import "@/assets/style/reset.scss";
import "@/assets/style/common.scss";
import "@/assets/style/flex.scss";
import "@/assets/style/index.scss";
import "ant-design-vue/dist/antd.css";

import VueAMap from 'vue-amap';
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});

Vue.use(VueAMap);

Vue.use(Antd)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
