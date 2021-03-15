import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home-page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "user-page",
        component: () => import("../views/user/Index.vue"),
      },
      {
        path: "/equipment",
        name: "equipment-page",
        component: () => import("../views/equipment/Index.vue"),
      },
      {
        path: "/warnning",
        name: "warnning-page",
        component: () => import("../views/warning/Index.vue"),
      },
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
