import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login-home",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register-home",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/home",
    name: "home-page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "index",
        name: "user-page",
        component: () => import("../views/user/Index.vue"),
      },
      {
        path: "equipment",
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
      path: "/home"
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
