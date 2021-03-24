import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "user-info",
        name: "user-info-page",
        component: () => import("../views/user/UserInfo.vue"),
      },
      {
        path: "update-secret",
        name: "update-secret-page",
        component: () => import("../views/user/UpdatePassword.vue"),
      },
      {
        path: "option-log",
        name: "option-log-page",
        component: () => import("../views/user/UserInfo.vue"),
      },
      {
        path: "",
        name: "equipment-page",
        component: () => import("../views/equipment/Index.vue"),
      },
      {
        path: "warnning",
        name: "warnning-page",
        component: () => import("../views/warning/Index.vue"),
      },
    ]
  },
  {
    path: "/*",
    redirect: {
      path: "/"
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
