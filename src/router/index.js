import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Edit from "../views/Edit.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
});

export default router;
