import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        name: "user-list-page",
        component: () => import("../views/user/UserList.vue"),
      },
      {
        path: "option-log",
        name: "option-log-page",
        component: () => import("../views/user/OptionLog.vue"),
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
      {
        path: "company",
        name: "company-manage-page",
        component: () => import("../views/base-manage/Company.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
